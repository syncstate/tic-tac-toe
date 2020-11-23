var express = require("express");
var cookie = require("cookie");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var socket = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const PatchManager = require("./PatchManager");
const { SyncStateRemote } = require("@syncstate/remote-server");
const remote = new SyncStateRemote();

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

var server = app.listen(8000, function () {
  console.log("listening on port 8000");
});

var io = socket(server, { pingTimeout: 100000, pingInterval: 3000 });

var allowedUsers = [];

var patchManager = new PatchManager();

// app.get("/", function (req, res) {
//   var randomNumber = Math.random().toString();
//   randomNumber = randomNumber.substring(2, randomNumber.length);
//   var token = randomNumber;
//   // console.log(allowedUsers.length);
//   if (allowedUsers.length <= 1) {
//     allowedUsers.push(token);
//   }

//   res.json({
//     token: token,
//     // users: allowedUsers,
//   });
// });

var allSockets = [];
var users = [];
var prevRoom = null;
io.on("connection", async (socket) => {
  console.log("okfef");

  var clientNo;
  function NumClientsInRoom(roomId, namespace) {
    io.of("/")
      .in(roomId)
      .clients(function (error, clients) {
        if (error) {
          throw error;
        }
        // console.log(clients[0]); // => [Anw2LatarvGVVXEIAAAD]
        // console.log(io.sockets.sockets[clients[0]]); //socket detail
        console.log("clients", clients.length);
        clientNo = clients.length;
      });
  }
  socket.on("enterRoom", async () => {
    if (prevRoom === null) {
      var roomId = uuidv4();
      console.log(roomId);
      socket.join(roomId);
      socket.projectId = roomId;
      prevRoom = roomId;
      users.push(socket.id);
      io.sockets.in(prevRoom).emit("sendRoom", prevRoom, users);
    } else {
      // console.log("prev", prevRoom);

      await NumClientsInRoom(prevRoom, "/");

      if (clientNo === 1) {
        socket.join(prevRoom);
        users.push(socket.id);
        socket.projectId = prevRoom;
        io.sockets.in(prevRoom).emit("sendRoom", prevRoom, users);
        users.length = 0;
      } else {
        var roomId = uuidv4();
        console.log(roomId);
        socket.join(roomId);
        users.push(socket.id);
        socket.projectId = roomId;
        prevRoom = roomId;
        io.sockets.in(prevRoom).emit("sendRoom", prevRoom, users);
      }
    }
    console.log("prevroom", prevRoom);
  });

  // socket.on("enterRoom", () => {
  //   console.log("kkkgkjgkjg");
  //   users.push(socket.id);
  //   // console.log(token);
  //   var roomId;
  //   if (prevRoom === null) {
  //     roomId = uuidv4();
  //     // console.log(roomId);
  //     socket.projectId = roomId;
  //     socket.join(roomId);
  //     prevRoom = roomId;
  //     io.sockets.in(roomId).emit("sendRoom", roomId, users);
  //   } else {
  //     // console.log(prevRoom);
  //     socket.projectId = prevRoom;
  //     socket.join(prevRoom);
  //     var id = prevRoom;
  //     prevRoom = null;
  //     //  console.log(id, users);
  //     io.sockets.in(id).emit("sendRoom", id, users);
  //     users.length = 0;
  //   }
  // });

  // socket.on("fetchDoc", (path, projectId) => {
  //   //get all patches

  //   const patchesList = patchManager.getAllPatches(projectId, path);

  //   if (patchesList) {
  //     //send each patch to the client
  //     patchesList.forEach((change) => {
  //       io.sockets.in(projectId).emit("change", path, change);
  //     });
  //   }
  // });
  //patches recieved from the client
  var id;
  socket.on("change", (path, change) => {
    change.origin = socket.id;
    id = socket.projectId;
    console.log("projectid", socket.projectId);
    // console.log("id", projectId);
    //resolves conflicts internally
    remote.processChange(socket.id, path, change);
  });

  const dispose = remote.onChangeReady(socket.id, (path, change) => {
    //console.log("id", id);

    patchManager.store(socket.projectId, path, change);
    //broadcast the path to other clients
    //  console.log("patch", change);

    socket.broadcast.to(id).emit("change", path, change);
  });

  socket.on("deletePatches", (projectId) => {
    patchManager.deletePatches(projectId);
  });

  socket.on("disconnect", function () {
    console.log("haandki");
    console.log(socket.projectId);
    io.sockets.in(socket.projectId).emit("disconnected");
  });
});
