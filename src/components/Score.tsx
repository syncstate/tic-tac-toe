import React from "react";
import { useDoc } from "@syncstate/react";
import Cookie from "js.cookie";
import { Row, Col } from "react-bootstrap";

function Score() {
  const [doc] = useDoc("", 10);

  return (
    <>
      <Row className="w-75">
        <Col
          xs={5}
          className="h-100 bg-light rounded d-flex flex-column align-items-center justify-content-around"
        >
          <i className="fas fa-user fa-3x"></i>
          <h3 style={{ fontSize: "2vw" }}>You</h3>
          {doc.socket.id === doc.user1 ? (
            <h2 className="text-danger font-weight-bold">X</h2>
          ) : (
            <h2 className="text-warning font-weight-bold">O</h2>
          )}
        </Col>
        <Col xs={2}></Col>
        <Col
          xs={5}
          className="h-100 bg-light rounded d-flex flex-column align-items-center justify-content-around"
        >
          <i className="fas fa-user fa-3x"></i>
          <h3 style={{ fontSize: "2vw" }}>Opponent</h3>
          {doc.socket.id === doc.user1 ? (
            <h2 className="text-warning font-weight-bold">O</h2>
          ) : (
            <h2 className="text-danger font-weight-bold">X</h2>
          )}
        </Col>
      </Row>
      <Row className="w-75">
        {(() => {
          if (doc.draw) {
            return (
              <Col sm={12} className="text-center">
                <h2 className="font-weight-bold text-light">Draw!</h2>
              </Col>
            );
          }
          if (doc.winner === "") {
            return (
              <Col sm={12} className="text-center">
                <h2 className="font-weight-bold text-light">
                  {doc.currentTurn}'s Turn
                </h2>
              </Col>
            );
          } else {
            if (doc.socket.id === doc.winner) {
              return (
                <>
                  <Col sm={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Winner</h2>
                  </Col>
                  <Col sm={2}></Col>
                  <Col sm={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Loser</h2>
                  </Col>
                </>
              );
            } else {
              return (
                <>
                  <Col sm={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Loser</h2>
                  </Col>
                  <Col sm={2}></Col>
                  <Col sm={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Winner</h2>
                  </Col>
                </>
              );
            }
          }
        })()}
      </Row>
    </>
  );
}
export default Score;
