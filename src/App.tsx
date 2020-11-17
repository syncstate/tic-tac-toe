import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col className="left-container"></Col>
          <Col
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ backgroundColor: "rgb(148, 148, 148)" }}
          >
            <div className="h-25 w-50 bg-white"></div>
            <Board />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
