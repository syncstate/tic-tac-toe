import React, { useState } from "react";
import { useDoc } from "@syncstate/react";
const io = require("socket.io-client");

function Square({ value }: { value: string }) {
  const [doc, setDoc] = useDoc("", Infinity);

  const checkWinner = () => {
    let winLines = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    checkMatch(winLines);
  };

  const checkMatch = (winLines) => {
    for (let index = 0; index < winLines.length; index++) {
      const [a, b, c] = winLines[index];
      let board = doc.currentValue;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (doc.socket.id === doc.user1) {
          console.log("you win");
        } else {
          console.log("you win!");
        }
      }
    }
  };
  checkWinner();
  const handleClick = () => {
    if (doc.currentValue[value] !== "") {
      return;
    }

    var currentUser = doc.socket.id;
    var trueVar = false;
    if (doc.currentTurn === "X") {
      if (currentUser === doc.user1) trueVar = true;
    }
    if (doc.currentTurn === "O") {
      if (currentUser === doc.user2) trueVar = true;
    }
    if (trueVar === true) {
      const curr_player = doc.currentTurn === "X" ? "O" : "X";

      setDoc((doc) => {
        doc.currentValue[value] = doc.currentTurn;
        doc.currentTurn = curr_player;
      });
    }
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="d-flex align-items-center justify-content-center w-25 rounded mx-1 h-25 text-white bg-dark"
    >
      {doc.currentValue[value]}
    </div>
  );
}
export default Square;
