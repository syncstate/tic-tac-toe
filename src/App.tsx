import React from "react";
import { useDoc } from "@syncstate/react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
import Score from "./components/Score";

function App() {
  const [doc, setDoc] = useDoc();

  // doc.socket.on("disconnection", () => {
  //   if(doc.socket.id===)
  //   setDoc((doc) => {
  //     doc.startScreen = true;
  //     doc.winner = "";
  //     doc.currentTurn = "X";
  //     doc.draw = false;
  //     doc.gameStatus = true;
  //     doc.currentValue = ["", "", "", "", "", "", "", "", ""];
  //   });
  // });

  const startGame = () => {
    setDoc((doc) => {
      doc.startScreen = false;
      doc.gameStatus = true;
    });
  };

  doc.socket.on("allUsers", function (users) {
    setDoc((doc) => {
      doc.user1 = users[0];
      doc.user2 = users[1];
      // doc.startScreen = true;
      // doc.winner = "";
      // doc.gameStatus = true;
      // doc.currentTurn = "X";
      // doc.draw = false;
      // doc.currentValue = ["", "", "", "", "", "", "", "", ""];
    });
  });

  return (
    <div>
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col xs={12} lg={5} className="border-right border-dark"></Col>
          {doc.startScreen ? (
            <Col
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ backgroundColor: "rgb(148, 148, 148)" }}
            >
              <div>
                <h1 className="font-weight-bold text-light display-2">TIC</h1>
                <h1 className="font-weight-bold text-light display-2">TAC</h1>
                <h1 className="font-weight-bold text-light display-2">TOE</h1>
              </div>
              {doc.socket.id === doc.user1 ? (
                <Button
                  variant="light"
                  size="lg"
                  block
                  className="text-dark rounded"
                  onClick={startGame}
                >
                  Start Game
                </Button>
              ) : null}
            </Col>
          ) : (
            <Col
              xs={12}
              lg={7}
              className="d-flex flex-sm-row flex-lg-column justify-content-around align-items-center"
              style={{ backgroundColor: "rgb(148, 148, 148)" }}
            >
              <Score />
              <Board />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
