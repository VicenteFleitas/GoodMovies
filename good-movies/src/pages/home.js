import React from "react";
import { Container, Row } from "react-bootstrap";
import { getPeliculas } from "./../lib/database";

function Home(props) {
  // get all movies
  getPeliculas();
  // render
  return (
    <>
      <Container fluid style={{ marginTop: 100 }}>
        <Row>alo</Row>
      </Container>
    </>
  );
}

export default Home;
