import React from "react";
import Container from "react-bootstrap/Container";

function Layout(props) {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      {props.children}
    </Container>
  );
}

export default Layout;
