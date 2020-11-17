import React from "react";
import { useDoc } from "@syncstate/react";

function Square({ value }: { value: string }) {
  const [doc, setDoc] = useDoc();

  const handleClick = () => {
    if (doc.currentValue[value] !== "") {
      return;
    }
    const curr_player = doc.currentTurn === "X" ? "O" : "X";
    setDoc((doc) => {
      doc.currentValue[value] = doc.currentTurn;
      doc.currentTurn = curr_player;
    });
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
