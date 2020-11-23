import React, { useState, useEffect } from "react";
import { useDoc } from "@syncstate/react";
import Cookie from "js.cookie";
import "./App.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
import Score from "./components/Score";
import Demo from "./components/Demo";
import { DocStore } from "@syncstate/core";
import { Socket } from "net";
function App() {
  const [doc, setDoc] = useDoc();

  // doc.socket.emit("fetchDoc", "/currentValue");
  // doc.socket.emit("fetchDoc", "/currentTurn");
  // doc.socket.emit("fetchDoc", "/user1");
  // doc.socket.emit("fetchDoc", "/user2");
  // doc.socket.emit("fetchDoc", "/draw");
  // doc.socket.emit("fetchDoc", "/roomId");
  // doc.socket.emit("fetchDoc", "/winner");
  // doc.socket.emit("fetchDoc", "/startScreen");
  // doc.socket.emit("fetchDoc", "/gameStatus");

  useEffect(() => {
    console.log("cool");
    // async function getUsers() {
    //   var res = await axios.get("http://localhost:8000");
    //   console.log(res);
    //   console.log("paaajii");
    //   if (!Cookie.get("user")) {
    //     Cookie.set("user", res.data.token);
    doc.socket.emit("enterRoom");
    //  }
    doc.socket.on("disconnected", () => {
      console.log("ok sir paaaaaaaf");
      alert("Opponent left the game!Refresh for new game!");
    });
    doc.socket.on("sendRoom", (roomId, users) => {
      console.log("hellooooo");
      setDoc((doc) => {
        doc.roomId = roomId;
        doc.user1 = users[0];
        doc.user2 = users[1];
      });
    });
    // }

    // getUsers();
  }, []);
  console.log("app doc", doc);

  const startGame = () => {
    if (doc.user2 === undefined) {
      alert("Searching for player...");
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
            xs={12}
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
                <Button
                  variant="light"
                  size="lg"
                  className="text-dark rounded w-50"
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
              className="d-flex flex-column justify-content-around align-items-center"
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
