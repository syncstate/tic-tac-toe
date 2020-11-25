import React from "react";
import Board from ".//Board";
import Score from "./Score";
import { Row, Col } from "react-bootstrap";
function Game() {
  return (
    <Col xs={12} lg={7} style={{ backgroundColor: "#6200ea" }}>
      <Row className="h-100">
        <Col xs={0} md={1} className="d-none d-md-inline "></Col>
        <Col
          xs={12}
          md={10}
          className="d-flex flex-column justify-content-around align-items-center"
        >
          <Score />
          <Board />
        </Col>
        <Col xs={0} md={1} className="d-none d-md-inline"></Col>
      </Row>
    </Col>
  );
}
export default Game;
