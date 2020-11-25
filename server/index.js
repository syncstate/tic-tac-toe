var express = require("express");
var cors = require("cors");
var socket = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const PatchManager = require("./PatchManager");
const { SyncStateRemote } = require("@syncstate/remote-server");
const remote = new SyncStateRemote();

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

var server = app.listen(8000, function () {
  console.log("listening on port 8000");
});

app.get("/", () => {});
var io = socket(server, { pingTimeout: 100000, pingInterval: 3000 });

var allowedUsers = [];

var patchManager = new PatchManager();

var allSockets = [];
var users = [];
var prevRoom = null;
io.on("connection", async (socket) => {
  var clientNo;
  function NumClientsInRoom(roomId, namespace) {
    io.of("/")
      .in(roomId)
      .clients(function (error, clients) {
        if (error) {
          throw error;
        }
        // clients[0]); // => [Anw2LatarvGVVXEIAAAD]
        // io.sockets.sockets[clients[0]]); //socket detail

        clientNo = clients.length;
      });
  }
  socket.on("enterRoom", async () => {
    if (prevRoom === null) {
      var roomId = uuidv4();
      socket.join(roomId);
      socket.projectId = roomId;
      prevRoom = roomId;
      users.push(socket.id);
      io.sockets.in(prevRoom).emit("sendRoom", prevRoom, users);
    } else {
      await NumClientsInRoom(prevRoom, "/");

      if (clientNo === 1) {
        socket.join(prevRoom);
        users.push(socket.id);
        socket.projectId = prevRoom;
        io.sockets.in(prevRoom).emit("sendRoom", prevRoom, users);
        users.length = 0;
      } else {
        var roomId = uuidv4();

        socket.join(roomId);
        users.push(socket.id);
        socket.projectId = roomId;
        prevRoom = roomId;
        io.sockets.in(prevRoom).emit("sendRoom", prevRoom, users);
      }
    }
  });

  socket.on("fetchDoc", (path) => {
    //get all patches
    const patchesList = patchManager.getAllPatches(socket.projectId, path);

    if (patchesList) {
      //send each patch to the client
      patchesList.forEach((change) => {
        socket.to(socket.projectId).emit("change", path, change);
      });
    }
  });

  //patches recieved from the client
  var id;
  socket.on("change", (path, change) => {
    change.origin = socket.id;
    id = socket.projectId;

    //resolves conflicts internally
    remote.processChange(socket.id, path, change);
  });

  const dispose = remote.onChangeReady(socket.id, (path, change) => {
    patchManager.store(socket.projectId, path, change);
    //broadcast the path to other clients

    socket.broadcast.to(id).emit("change", path, change);
  });

  socket.on("deletePatches", (projectId) => {
    patchManager.deletePatches(projectId);
  });

  socket.on("disconnect", function () {
    patchManager.deletePatches(socket.projectId);
    socket.leave(socket.projectId);
    if (users.length == 1) users.length = 0;
    socket.broadcast.to(socket.projectId).emit("disconnected");
  });
});
