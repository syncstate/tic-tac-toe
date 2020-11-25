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

const store = createDocStore(
  {
    startScreen: true,
    currentValue: ["", "", "", "", "", "", "", "", ""],
    currentTurn: "X",
    history: [],
    user1: "",
    user2: "",
    socket: socket,
    winner: "",
    roomId: "",
    loading1: false,
    loading2: false,
    draw: false,
    gameStatus: false,
  },
  [remote.createInitializer()]
);

store.dispatch(remote.enableRemote(""));

socket.emit("fetchDoc", "/currentValue");
socket.emit("fetchDoc", "/currentTurn");
socket.emit("fetchDoc", "/user1");
socket.emit("fetchDoc", "/user2");
socket.emit("fetchDoc", "/winner");
socket.emit("fetchDoc", "/roomId");
socket.emit("fetchDoc", "/loading1");
socket.emit("fetchDoc", "/loading2");
socket.emit("fetchDoc", "/draw");
socket.emit("fetchDoc", "/gameStatus");

store.observe("doc", "/user1", (user1, change) => {
  if (!change.origin) {
    socket.emit("change", "/user1", change);
  }
});
store.observe("doc", "/loading1", (loading1, change) => {
  if (!change.origin) {
    socket.emit("change", "/loading1", change);
  }
});
store.observe("doc", "/loading2", (loading2, change) => {
  if (!change.origin) {
    socket.emit("change", "/loading2", change);
  }
});
store.observe("doc", "/user2", (user2, change) => {
  if (!change.origin) {
    socket.emit("change", "/user2", change);
  }
});
store.observe("doc", "/startScreen", (startScreen, change) => {
  if (!change.origin) {
    socket.emit("change", "/startScreen", change);
  }
});
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

store.observe("doc", "/winner", (winner, change) => {
  if (!change.origin) {
    socket.emit("change", "/winner", change);
  }
});
store.observe("doc", "/gameStatus", (gameStatus, change) => {
  if (!change.origin) {
    socket.emit("change", "/gameStatus", change);
  }
});
store.observe("doc", "/draw", (draw, change) => {
  if (!change.origin) {
    socket.emit("change", "/draw", change);
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
