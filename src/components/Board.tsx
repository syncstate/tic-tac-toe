import React from "react";
import { useDoc } from "@syncstate/react";
import Square from "./Square";

function Board() {
  const [doc] = useDoc();
  const boardList = doc.currentValue.map((box, index) => {
    return <Square key={index} value={index} />;
  });

  return (
    <div className="d-flex xs={12} rounded flex-row justify-content-md-around align-content-around flex-wrap h-50 w-50 bg-white">
      {boardList}
    </div>
  );
}
export default Board;
