import React from "react";
import { Row, Col } from "react-bootstrap";

function LeftPanel() {
  return (
    <Row className="d-flex justify-content-around h-100 pl-2">
      <Col xs={12}>
        <h1 className="pt-3">Tic-Tac-Toe</h1>
        <p className="pt-2">
          Implementation of multiplayer Tic-Tac-Toe game using react and
          syncstate. The purpose of the application is to show how syncstate
          helps make socket applications simpler to make and more efficient.
        </p>
      </Col>

      <Col xs={12}>
        <h2 className="pt-3">Game Rules</h2>
        <ul className="pt-2 pl-3">
          <li>The game is played on a grid that's 3 squares by 3 squares.</li>
          <li>You are randomy assigned &#x2715; or &#x4f;.</li>
          <li>
            The first player to get 3 of his marks in a row (up, down, across,
            or diagonally) is the winner.
          </li>
          <li>When all 9 squares are full, the game is over.</li>
        </ul>
      </Col>
      <Col xs={12}>
        <h2 className="pt-3">Room Rules</h2>
        <ul className="pt-2 pl-3">
          <li>
            When you start the game, if a room is available, you are added to
            it. If not, a room is created and you wait for an opponent.
          </li>
          <li>
            When a player leaves, you are asked to refresh the page in order to
            look for another player
          </li>
        </ul>
      </Col>
      <Col xs={12}>
        <h2 className="pt-3">Role of SyncState</h2>
        <p className="pt-2">
          SyncState works on patches. Patches, in general, are the change on the
          original state of instead of the entire state. So when working with
          sockets, only the change is transmitted. This helps reduce the size of
          the package. SyncState also comes with a default support for sockets
          making it easier to implement.
        </p>
      </Col>
    </Row>
  );
}

export default LeftPanel;
