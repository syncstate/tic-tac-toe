import React from "react";
import { useDoc } from "@syncstate/react";

function Square({ value }: { value: string }) {
  const [doc, setDoc] = useDoc("", 10);

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
      {doc.currentValue[value] === "X" ? (
        <span className="text-danger h2">{doc.currentValue[value]}</span>
      ) : (
        <span className="text-warning h2">{doc.currentValue[value]}</span>
      )}
    </div>
  );
}
export default Square;
