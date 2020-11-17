import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col xs={12} lg={6} className="border-right border-dark"></Col>
          <Col
            xs={12}
            lg={6}
            className="d-flex flex-sm-row flex-lg-column justify-content-around align-items-center"
            style={{ backgroundColor: "rgb(148, 148, 148)" }}
          >
            <div className="h-25 w-25 bg-white rounded"></div>
            <Board />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
