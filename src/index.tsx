import React from "react";
import { createDocStore } from "@syncstate/core";
import { Provider } from "@syncstate/react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as remote from "@syncstate/remote-client";
import reportWebVitals from "./reportWebVitals";
const io = require("socket.io-client");

var socket = io.connect("http://localhost:8000");
var socketId;
socket.on("connect", () => {
  socketId = socket.id;
  console.log(document);
});

console.log(socketId);

const store = createDocStore(
  {
    startScreen: true,
    currentValue: ["", "", "", "", "", "", "", "", ""],
    currentTurn: "X",
    history: [],
    user1: "",
    user2: "",
    name1: "",
    name2: "",
    symbol1: "",
    symbol2: "",
    socket: socket,
    winner: "",
  },
  [remote.createInitializer()]
);

store.dispatch(remote.enableRemote("/currentTurn"));

// socket.emit("fetchDoc", "/currentTurn");
// socket.emit("fetchDoc", "/currentValue");

store.observe("doc", "/currentTurn", (currentTurn, change) => {
  if (!change.origin) {
    socket.emit("change", "/currentTurn", change);
  }
});
store.observe("doc", "/currentValue", (currentValue, change) => {
  if (!change.origin) {
    socket.emit("change", "/currentValue", change);
  }
});
store.observe("doc", "/currentUser", (currentUser, change) => {
  if (!change.origin) {
    socket.emit("change", "/currentUser", change);
  }
});
store.observe("doc", "/user1", (user1, change) => {
  if (!change.origin) {
    socket.emit("change", "/user1", change);
  }
});
store.observe("doc", "/user2", (user2, change) => {
  if (!change.origin) {
    socket.emit("change", "/user2", change);
  }
});

socket.on("change", (path, patch) => {
  store.dispatch(remote.applyRemote(path, patch));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
