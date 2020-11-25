const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const PatchManager = require("./PatchManager");
const { SyncStateRemote } = require("@syncstate/remote-server");
const remote = new SyncStateRemote();

let app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let server = app.listen(8000);

app.get("/", () => {});
let io = socket(server, { pingTimeout: 100000, pingInterval: 3000 });

let patchManager = new PatchManager();

let users = [];
let prevRoom = null;
io.on("connection", async (socket) => {
  let noOfClients;
  function noOfClientsInRoom(roomId, namespace) {
    io.of("/")
      .in(roomId)
      .clients(function (error, clients) {
        if (error) {
          throw error;
        }
        noOfClients = clients.length;
      });
  }
  socket.on("roomJoin", async () => {
    if (prevRoom === null) {
      const roomId = uuidv4();
      socket.join(roomId);
      socket.roomId = roomId;
      prevRoom = roomId;
      users.push(socket.id);
      io.sockets.in(prevRoom).emit("roomJoined", prevRoom, users);
    } else {
      await noOfClientsInRoom(prevRoom, "/");

      if (noOfClients === 1) {
        socket.join(prevRoom);
        users.push(socket.id);
        socket.roomId = prevRoom;
        io.sockets.in(prevRoom).emit("roomJoined", prevRoom, users);
        users.length = 0;
      } else {
        const roomId = uuidv4();
        socket.join(roomId);
        users.push(socket.id);
        socket.roomId = roomId;
        prevRoom = roomId;
        io.sockets.in(prevRoom).emit("roomJoined", prevRoom, users);
      }
    }
  });

  socket.on("fetchDoc", (path) => {
    //get all patches
    const patchesList = patchManager.getAllPatches(socket.roomId, path);

    if (patchesList) {
      //send each patch to the client
      patchesList.forEach((change) => {
        socket.to(socket.roomId).emit("change", path, change);
      });
    }
  });

  socket.on("change", (path, change) => {
    change.origin = socket.id;

    //resolves conflicts internally
    remote.processChange(socket.id, path, change);
  });

  const dispose = remote.onChangeReady(socket.id, (path, change) => {
    patchManager.store(socket.roomId, path, change);

    //broadcast the path to other clients
    socket.broadcast.to(socket.roomId).emit("change", path, change);
  });

  socket.on("deletePatches", (roomId) => {
    patchManager.deletePatches(roomId);
  });

  socket.on("disconnect", function () {
    patchManager.deletePatches(socket.roomId);
    socket.leave(socket.roomId);
    if (users.length == 1) users.length = 0;
    socket.broadcast.to(socket.roomId).emit("disconnected");
  });
});
