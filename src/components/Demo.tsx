import React, { useEffect } from "react";
import { useDoc } from "@syncstate/react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Demo() {
  const [doc, setDoc] = useDoc();

  useEffect(() => {
    console.log("coofaefefk");
    setDoc((doc) => {
      doc.user2 = "cyfffrus";
    });
  }, []);
  console.log("demo doc", doc);
  return <div>okay</div>;
}

export default Demo;
