import React, { useState } from "react";
import { Container, Row, Dropdown } from "react-bootstrap";
import Cards from "./../components/cards";

function Home(props) {
  const [currentNum, setCurrentNum] = useState(10);
  // render
  return (
    <Container
      fluid
      style={{
        marginTop: 120,
      }}
    >
      <Row className="mt-4 justify-content-center">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Paginación
          </Dropdown.Toggle>

          <Dropdown.Menu
            onClick={(e) => {
              console.log(e.target.id);
              setCurrentNum(parseInt(e.target.id));
            }}
          >
            <Dropdown.Item id="5">5</Dropdown.Item>
            <Dropdown.Item id="10">10</Dropdown.Item>
            <Dropdown.Item id="20">20</Dropdown.Item>
            <Dropdown.Item id="50">50</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Row className="mt-4 justify-content-center">
        {props.cards.slice(0, currentNum).map((c, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <Cards movie={c}></Cards>
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
