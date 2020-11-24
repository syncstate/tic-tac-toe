import React, { useState, useEffect } from "react";
import { useDoc } from "@syncstate/react";

import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
import Score from "./components/Score";
import Demo from "./components/Demo";
import { DocStore } from "@syncstate/core";

function App() {
  const [doc, setDoc] = useDoc();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("cool");

    doc.socket.emit("enterRoom");

    doc.socket.on("disconnected", () => {
      if (doc.user2 === undefined) alert("Opponent left the game!");
      console.log("dosccsfgdgdg");
      window.location.reload(false);
    });
    doc.socket.on("sendRoom", (roomId, users) => {
      setDoc((doc) => {
        doc.roomId = roomId;
        doc.user1 = users[0];
        doc.user2 = users[1];
      });
    });
  }, []);
  console.log("app doc", doc);

  const startGame = () => {
    if (doc.user2 === undefined) {
      setLoading(true);
      // alert("Searching for player...");
      return;
    }
    setDoc((doc) => {
      doc.startScreen = false;
      doc.gameStatus = true;
    });
  };

  return (
    <div>
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col
            xs={0}
            lg={5}
            className="border-right border-dark d-none d-lg-inline d-lg-inline"
          ></Col>
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

              {doc.socket.id === doc.user1 || doc.socket.id === doc.user2 ? (
                <>
                  <Button
                    variant="light"
                    size="lg"
                    className="text-dark rounded w-50"
                    onClick={startGame}
                  >
                    Start Game
                  </Button>
                </>
              ) : null}
            </Col>
          ) : (
            <Col
              xs={12}
              lg={7}
              // className="d-flex flex-column justify-content-around h-100 .align-items-sm-start align-items-md-center"
              style={{ backgroundColor: "rgb(148, 148, 148)" }}
            >
              <Row className="h-100">
                <Col xs={0} md={2} className="d-none d-md-inline "></Col>
                <Col
                  xs={12}
                  md={8}
                  className="d-flex flex-column justify-content-around align-items-center"
                >
                  <Score />
                  <Board />
                </Col>
                <Col xs={0} md={2} className="d-none d-md-inline"></Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
