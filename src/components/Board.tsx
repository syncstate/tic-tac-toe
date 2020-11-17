import React, { useState } from "react";
import Square from "./Square";

function Board() {
  const [board, setBoard] = useState([
    "X",
    "O",
    "X",
    "O",
    "X",
    "O",
    "X",
    "O",
    "X",
  ]);
  const boardList = board.map((box, index) => {
    return <Square key={index} value={box} />;
  });

  return (
    <div className="d-flex xs={12} rounded flex-row justify-content-md-around align-content-around flex-wrap h-50 w-50 bg-white">
      {boardList}
    </div>
  );
}
export default Board;
