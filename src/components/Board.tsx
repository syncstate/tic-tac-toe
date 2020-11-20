import React from "react";
import { useDoc } from "@syncstate/react";
import Square from "./Square";
import Result from "./Result";
function Board() {
  const [doc, setDoc] = useDoc();

  //get board list
  const boardList = doc.currentValue.map((box, index) => {
    return <Square key={index} value={index} />;
  });

  //check winner
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
    if (!isUpdating) areAllBoxesClicked();
  };

  //check match
  var isUpdating = false;
  const checkMatch = (winLines) => {
    for (let index = 0; index < winLines.length; index++) {
      const [a, b, c] = winLines[index];
      let board = doc.currentValue;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        isUpdating = true;
        if (doc.currentTurn === "O") {
          setDoc((doc) => {
            doc.winner = doc.user1;
            doc.gameStatus = false;
          });
        } else {
          setDoc((doc) => {
            doc.winner = doc.user2;
            doc.gameStatus = false;
          });
        }
      }
    }
  };

  // check all boxes clicked.
  const areAllBoxesClicked = () => {
    // Declare variable to store number of clicked boxes.
    let count = 0;
    let boxes = doc.currentValue;
    // Iterate over all boxes
    boxes.forEach(function (item) {
      // Check if box is clicked (not null)
      if (item !== "") {
        // If yes, increase the value of count by 1
        count++;
      }
    });

    // Check if all boxes are clicked (filled)
    if (count === 9 && doc.winner === "") {
      console.log("board", doc);
      setDoc((doc) => {
        doc.draw = true;
        doc.gameStatus = false;
      });
    }
  };
  if (doc.gameStatus) checkWinner();
  if (!isUpdating) areAllBoxesClicked();

  if (!doc.gameStatus) return <Result />;
  else {
    return (
      <div className="d-flex xs={12} rounded flex-row justify-content-md-around align-content-around flex-wrap h-50 w-50 bg-white">
        {boardList}
      </div>
    );
  }
}
export default Board;
