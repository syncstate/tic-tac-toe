import React, { useState, useEffect } from "react";
import { useDoc } from "@syncstate/react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
import Score from "./components/Score";
import LeftPanel from "./components/LeftPanel";

function App() {
  const [doc, setDoc] = useDoc();
  const [start, setStart] = useState(false);

  useEffect(() => {
    doc.socket.emit("enterRoom");
    doc.socket.on("sendRoom", (roomId, users) => {
      setDoc((doc) => {
        doc.roomId = roomId;
        doc.user1 = users[0];
        doc.user2 = users[1];
      });
    });
  }, []);

  doc.socket.on("disconnected", () => {
    setStart(false);
    window.location.reload(false);
  });
  const startGame = () => {
    if (doc.socket.id === doc.user1) {
      setDoc((doc) => {
        doc.loading1 = true;
      });
    }

    if (doc.socket.id === doc.user2) {
      setDoc((doc) => {
        doc.loading2 = true;
      });
    }
    setStart(true);
  };
  const checkPlayers = () => {
    if (doc.loading1 && doc.loading2 && start && doc.user1 && doc.user2) {
      setDoc((doc) => {
        doc.startScreen = false;
        doc.gameStatus = true;
      });
    }
  };

  checkPlayers();

  return (
    <div>
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col
            xs={0}
            lg={5}
            className="border-right border-dark d-none d-lg-inline d-lg-inline"
          >
            <LeftPanel />
          </Col>
          {doc.startScreen ? (
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
              {start ? (
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
                    onClick={startGame}
                  >
                    Start Game
                  </Button>
                </>
              )}
            </Col>
          ) : (
            <Col
              xs={12}
              lg={7}
              // className="d-flex flex-column justify-content-around h-100 .align-items-sm-start align-items-md-center"
              style={{ backgroundColor: "#6200ea" }}
            >
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
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
