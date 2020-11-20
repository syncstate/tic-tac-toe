import React from "react";
import { useDoc } from "@syncstate/react";
import { Row, Col } from "react-bootstrap";

function Score() {
  const [doc] = useDoc("", 10);

  if (doc.socket.id !== doc.user1 && doc.socket.id !== doc.user2) {
    return (
      <Row className="h-25 w-75 bg-primary">
        <Col
          sm={12}
          className="h-100 bg-light rounded d-flex flex-column align-items-center justify-content-around"
        >
          <i className="far fa-smile fa-3x"></i>
          <p>Sorry maximum no of players reached!</p>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="h-25 w-75">
          <Col
            sm={5}
            className="h-100 bg-light rounded d-flex flex-column align-items-center justify-content-around"
          >
            <i className="fas fa-user fa-3x"></i>
            <h3>You</h3>
            {doc.socket.id === doc.user1 ? (
              <h2 className="text-danger font-weight-bold">X</h2>
            ) : (
              <h2 className="text-warning font-weight-bold">O</h2>
            )}
          </Col>
          <Col sm={2}></Col>
          <Col
            sm={5}
            className="h-100 bg-light rounded d-flex flex-column align-items-center justify-content-around"
          >
            <i className="fas fa-user fa-3x"></i>
            <h3>Opponent</h3>
            {doc.socket.id === doc.user1 ? (
              <h2 className="text-warning font-weight-bold">O</h2>
            ) : (
              <h2 className="text-danger font-weight-bold">X</h2>
            )}
          </Col>
          <Col
            sm={12}
            className="h-50 d-flex flex-row mt-3 justify-content-around"
          >
            {(() => {
              if (doc.draw) {
                return <h2 className="font-weight-bold text-light">DRAW</h2>;
              }
              if (doc.winner === "")
                return (
                  <h2 className="font-weight-bold text-light">
                    {doc.currentTurn}'s Turn
                  </h2>
                );
              else {
                if (doc.socket.id === doc.winner)
                  return (
                    <>
                      <h2 className="font-weight-bold text-light">Winner</h2>;
                      <h2 className="font-weight-bold text-light ml-2">
                        Loser
                      </h2>
                      ;
                    </>
                  );
                else
                  return (
                    <>
                      <h2 className="font-weight-bold text-light">Loser</h2>;
                      <h2 className="font-weight-bold text-light ml-5">
                        Winner
                      </h2>
                      ;
                    </>
                  );
              }
            })()}
          </Col>
        </Row>
      </>
    );
  }
}
export default Score;
