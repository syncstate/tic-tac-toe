import React from "react";
import { useDoc } from "@syncstate/react";
import { Button } from "react-bootstrap";

function Result() {
  const [doc, setDoc] = useDoc("", 20);

  const playAgain = () => {
    setDoc((doc) => {
      doc.startScreen = true;
      doc.winner = "";
      doc.currentTurn = "X";
      doc.draw = false;
      doc.currentValue = ["", "", "", "", "", "", "", "", ""];
    });
  };
  if (doc.socket.id !== doc.user1 && doc.socket.id !== doc.user2) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-around h-50 w-50 bg-white">
        {doc.winner === doc.user1 ? <h3>User1 Won!</h3> : <h3>User2 Won!</h3>}
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-around h-50 w-50 bg-white">
        {(() => {
          if (doc.draw)
            return (
              <>
                <i className="fas fa-handshake fa-4x"></i>
                <h2 className="font-weight-bold">IT'S A DRAW!</h2>
              </>
            );
          if (doc.socket.id === doc.winner) {
            return (
              <>
                <i className="far fa-smile-wink fa-4x"></i>
                <h2 className="font-weight-bold">You Won!</h2>
              </>
            );
          } else {
            return (
              <>
                <i className="far fa-sad-cry fa-4x"></i>
                <h2 className="font-weight-bold">You Lose!</h2>
              </>
            );
          }
        })()}

        <Button
          variant="secondary"
          size="lg"
          className="text-white rounded"
          onClick={playAgain}
        >
          Play Again
        </Button>
      </div>
    </>
  );
}
export default Result;
