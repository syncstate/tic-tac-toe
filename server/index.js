var express = require("express");
var socket = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const PatchManager = require("./PatchManager");
const { SyncStateRemote } = require("@syncstate/remote-server");
const remote = new SyncStateRemote();

var app = express();
var server = app.listen(8000, function () {
  console.log("listening on port 8000");
});

var io = socket(server);
var projectId = uuidv4();
const socketsId = [];

var patchManager = new PatchManager();

io.on("connection", function (socket) {
  io.clients((error, clients) => {
    console.log("connecting");
    socket.broadcast.emit("disconnection");
    if (error) throw error;
    console.log(clients);
    socket.emit("allUsers", clients);
  });

  socket.on("fetchDoc", (path) => {
    //get all patches
    console.log("hello", path);
    const patchesList = patchManager.getAllPatches(projectId, path);

    if (patchesList) {
      //send each patch to the client
      patchesList.forEach((change) => {
        socket.emit("change", path, change);
      });
    }
  });
  //patches recieved from the client
  socket.on("change", (path, change) => {
    change.origin = socket.id;

    //resolves conflicts internally
    remote.processChange(socket.id, path, change);
  });

  const dispose = remote.onChangeReady(socket.id, (path, change) => {
    patchManager.store(projectId, path, change);
    //broadcast the path to other clients
    socket.broadcast.emit("change", path, change);
  });
  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    // socket.emit("disconnection");
  });
});
