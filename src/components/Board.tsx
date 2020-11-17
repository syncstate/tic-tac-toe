import React from "react";
import Square from "./Square";
function Board() {
  const board = Array(9).fill(null);
  const boardList = board.map((box, index) => {
    return <Square key={index} />;
  });

  return (
    <div className="d-flex flex-row justify-content-around align-content-around flex-wrap h-50 w-50 bg-white">
      {boardList}
    </div>
  );
}
export default Board;
