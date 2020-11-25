import React, { useState, useEffect } from "react";
import { useDoc } from "@syncstate/react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Game from "./components/Game";
import LeftPanel from "./components/LeftPanel";
import StartScreen from "./components/StartScreen";

function App() {
  const [doc, setDoc] = useDoc();
  const [gameStarted, setStart] = useState(false);

  useEffect(() => {
    doc.socket.emit("roomJoin");
    doc.socket.on("roomJoined", (roomId, users) => {
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
    if (doc.loading1 && doc.loading2 && gameStarted && doc.user1 && doc.user2) {
      setDoc((doc) => {
        doc.gameStatus = true;
        doc.startScreen = false;
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
            <StartScreen gameStarted={gameStarted} startGame={startGame} />
          ) : (
            <Game />
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
