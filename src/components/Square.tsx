import React from "react";
import { useDoc } from "@syncstate/react";

function Square({ value }: { value: string }) {
  const [doc, setDoc] = useDoc("", 10);

  const handleClick = () => {
    if (doc.currentValue[value] !== "") {
      return;
    }

    var currentUser = doc.socket.id;
    var moveValid = false;
    if (doc.currentTurn === "X") {
      if (currentUser === doc.user1) moveValid = true;
    } else if (doc.currentTurn === "O") {
      if (currentUser === doc.user2) moveValid = true;
    }
    if (moveValid) {
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
      className="d-flex align-items-center justify-content-center text-white rounded"
      style={{ height: "30%", width: "30%", backgroundColor: "black" }}
    >
      {doc.currentValue[value] === "X" ? (
        <span className="text-danger display-3 font-weight-bold">&#x2715;</span>
      ) : (
        <span className="text-warning display-3 font-weight-bold">
          {doc.currentValue[value]}
        </span>
      )}
    </div>
  );
}
export default Square;
