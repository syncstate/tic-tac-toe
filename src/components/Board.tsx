import React, { useEffect } from "react";
import { useDoc } from "@syncstate/react";
import Square from "./Square";
import Result from "./Result";
import { Row, Col } from "react-bootstrap";
function Board() {
  const [doc, setDoc] = useDoc();
  let winner = false;

  useEffect(() => {
    if (doc.winner === "") checkWinner();
    if (!winner) areAllBoxesClicked();
  }, [doc.currentValue]);

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
  };

  //check match

  const checkMatch = (winLines) => {
    for (let index = 0; index < winLines.length; index++) {
      const [a, b, c] = winLines[index];
      let board = doc.currentValue;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        doc.socket.emit("deletePatches", doc.roomId);
        winner = true;

        if (doc.currentTurn === "O") {
          setDoc((doc) => {
            doc.winner = doc.user1;
            doc.gameStatus = false;
            doc.loading1 = false;
            doc.loading2 = false;
          });
        } else {
          setDoc((doc) => {
            doc.winner = doc.user2;
            doc.gameStatus = false;
            doc.loading1 = false;
            doc.loading2 = false;
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
    if (count === 9 && doc.winner === "" && !winner) {
      doc.socket.emit("deletePatches", doc.roomId);
      setDoc((doc) => {
        doc.draw = true;
        doc.gameStatus = false;
        doc.loading1 = false;
        doc.loading2 = false;
      });
    }
  };

  if (!doc.gameStatus) return <Result />;
  else {
    return (
      <Row className="w-100  board" style={{ height: "56vh" }}>
        <Col xs={0} md={1}></Col>
        <Col
          xs={12}
          md={10}
          className="bg-primary d-flex my-board rounded flex-row py-3 justify-content-around align-content-around flex-wrap h-100  bg-white"
        >
          {boardList}
        </Col>
        <Col xs={0} md={1}></Col>
      </Row>
    );
  }
}
export default Board;
