import React from "react";
import { useDoc } from "@syncstate/react";
import { Row, Col, Button } from "react-bootstrap";

function Result() {
  const [doc, setDoc] = useDoc("", 20);

  const playAgain = () => {
    setDoc((doc) => {
      doc.startScreen = false;
      doc.winner = "";
      doc.currentTurn = "X";
      doc.draw = false;
      doc.gameStatus = true;
      doc.currentValue = ["", "", "", "", "", "", "", "", ""];
    });
  };

  return (
    <>
      <Row className="w-100 h-50">
        <Col xs={0} md={1}></Col>

        <Col
          xs={12}
          md={10}
          className="d-flex flex-column align-items-center justify-content-around h-100 w-50 bg-white"
        >
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
        </Col>
        <Col xs={0} md={1}></Col>
      </Row>
    </>
  );
}
export default Result;
