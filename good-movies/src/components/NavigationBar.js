import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Styles = styled.div``;

function NavigationBar(props) {
  return (
    <Styles>
      <Navbar expand="lg" bg="light" fixed="top">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="250"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {props.isConnected ? (
              <>
                <Nav.Item style={{ alignSelf: "center" }}>
                  <h4 className="text-secondary mr-5 mt-2">
                    Todas Las Mejores Peliculas
                  </h4>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/">
                      <i className="fas fa-2x fa-home mt-2 mr-2"></i>
                    </Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/" onClick={props.onLogout}>
                      <i className="fas fa-2x fa-power-off mt-2"></i>
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/">
                      <Button
                        onClick={() => {
                          props.openModal();
                        }}
                        variant="success"
                      >
                        <i className="far fa-user-circle"></i> ACCEDER
                      </Button>
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}

export default NavigationBar;
