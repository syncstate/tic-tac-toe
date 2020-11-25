import React from "react";
import { useDoc } from "@syncstate/react";
import { Row, Col } from "react-bootstrap";

function Score() {
  const [doc] = useDoc("", 10);

  return (
    <>
      <Row className="w-100" style={{ height: "22vh" }}>
        <Col
          xs={5}
          className="h-100 bg-light rounded d-flex flex-column justify-content-around align-items-center"
        >
          <i className="fas fa-user fa-2x mt-1 demo"></i>
          <h3 className="demo">You</h3>
          {doc.socket.id === doc.user1 ? (
            <h2 className="text-danger  font-weight-bold ">&#x2715;</h2>
          ) : (
            <h2 className="text-warning  font-weight-bold">&#x4f;</h2>
          )}
        </Col>
        <Col xs={2}></Col>
        <Col
          xs={5}
          className="h-100 bg-light rounded d-flex flex-column align-items-center justify-content-around"
        >
          <i className="fas fa-user fa-2x mt-1 demo"></i>
          <h3 className="demo">Opponent</h3>
          {doc.socket.id === doc.user1 ? (
            <h2 className="text-warning  font-weight-bold">&#x4f;</h2>
          ) : (
            <h2 className="text-danger font-weight-bold">&#x2715;</h2>
          )}
        </Col>
      </Row>
      <Row className="w-100">
        {(() => {
          if (doc.draw) {
            return (
              <Col xs={12} className="text-center">
                <h2 className="font-weight-bold text-light">Draw!</h2>
              </Col>
            );
          }
          if (doc.winner === "") {
            return (
              <Col xs={12} className="text-center">
                <h2 className="font-weight-bold text-light">
                  {doc.currentTurn}'s Turn
                </h2>
              </Col>
            );
          } else {
            if (doc.socket.id === doc.winner) {
              return (
                <>
                  <Col xs={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Winner</h2>
                  </Col>
                  <Col xs={2}></Col>
                  <Col xs={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Loser</h2>
                  </Col>
                </>
              );
            } else {
              return (
                <>
                  <Col xs={5} className="text-center">
                    <h2 className="font-weight-bold text-light">Loser</h2>
                  </Col>
                  <Col xs={2}></Col>
                  <Col xs={5} className="text-center">
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
