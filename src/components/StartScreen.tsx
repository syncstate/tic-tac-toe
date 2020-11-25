import React from "react";
import { Col, Button } from "react-bootstrap";

function StartScreen({
  gameStarted,
  startGame,
}: {
  gameStarted: boolean;
  startGame: () => void;
}) {
  return (
    <Col
      xs={12}
      lg={7}
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: "#6200ea" }}
    >
      <div>
        <h1 className="font-weight-bold text-light display-2">TIC</h1>
        <h1 className="font-weight-bold text-light display-2">TAC</h1>
        <h1 className="font-weight-bold text-light display-2">TOE</h1>
      </div>
      {gameStarted ? (
        <>
          <h3 className="text-white pt-5">Finding Opponents</h3>

          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <Button
            variant="light"
            size="lg"
            block
            className="text-dark rounded w-75 mt-5"
            onClick={() => {
              startGame();
            }}
          >
            Start Game
          </Button>
        </>
      )}
    </Col>
  );
}

export default StartScreen;
