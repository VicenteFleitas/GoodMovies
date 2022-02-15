import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";

import Layout from "./components/Layout";
import NavigationBar from "./components/NavigationBar";
import { login } from "./lib/login";

import loginLogo from "./assets/loginlogo.jpg";

function App() {
  // verify authentication
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);
  // signUp model visibility state
  const [showSignUp, setShowSignUp] = useState(false);
  // login modal visibility state
  const [show, setShow] = useState(false);

  // signup modal visibility functions
  const handleSignUpClose = () => setShowSignUp(false);
  const handleSignUpShow = () => setShowSignUp(true);
  // login modal visibility functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // login modal form ref
  const emailRef = useRef();
  const passwordRef = useRef();

  // login
  const handleLogin = () => {
    handleClose();
    login({
      email: emailRef.current.value,
      pass: passwordRef.current.value,
    }).then((result) => {
      if (result.access) {
        setUserId(result.access);
        console.log("login success!");
        setIsConnected(true);
      } else {
        //handle erros
        if (result.detail) console.log(result.detail);
        if (result.username) console.log(result.username);
        if (result.password) console.log(result.password);
      }
    });
  };

  return (
    <>
      <Layout>
        <Router>
          <NavigationBar
            isConnected={isConnected}
            openModal={handleShow}
            openSignUp={handleSignUpShow}
            userId={userId}
          />
        </Router>
        {/* Modal para login */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ingresa Ahora</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body className="text-center">
                <img
                  alt=""
                  src={loginLogo}
                  width="300"
                  //className="d-inline-block align-top"
                />
                <h4 className="text-center mb-4 mt-4">Iniciar sesión</h4>
                <Form>
                  <Form.Group id="email">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Acceder
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  );
}

export default App;
