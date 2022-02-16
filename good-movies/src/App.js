import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { Modal, Button, Form, Card } from "react-bootstrap";

import Layout from "./components/Layout";
import NavigationBar from "./components/NavigationBar";
import { login, getPeliculas } from "./lib/database";
import ToastAlert from "./components/toastAlert";

import Home from "./pages/home";
import Movie from "./pages/movie";

import loginLogo from "./assets/loginlogo.jpg";

function App() {
  // verify authentication
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);
  // login modal visibility state
  const [show, setShow] = useState(false);
  // toast
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState("Titulo");
  const [messageAlert, setMessageAlert] = useState("Mensaje de alerta");
  // peliculas
  const [cards, setCards] = useState([]);

  // login modal visibility functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // login modal form ref
  const [myName, setMyName] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();

  // login
  const handleLogin = () => {
    setMyName(emailRef.current.value);
    handleClose();
    login({
      email: emailRef.current.value,
      pass: passwordRef.current.value,
    }).then((result) => {
      if (result.access) {
        setUserId(result.access);
        setIsConnected(true);
        setShowAlert(true);
        setTitleAlert("Login exitoso.");
        setMessageAlert("");
        //setMyName(emailRef.current.value);
      } else {
        //handle erros
        setShowAlert(true);
        setTitleAlert("Error de autenticacion.");
        if (result.detail) {
          setMessageAlert(result.detail);
        }
        if (result.username && result.password === undefined) {
          setMessageAlert(`USUARIO: ${result.username[0]}`);
        }
        if (result.password && result.username === undefined) {
          setMessageAlert(`CONTRASEÑA: ${result.password[0]}`);
        }
        if (result.username && result.password) {
          setMessageAlert(
            `USUARIO: ${result.username[0]} CONTRASEÑA: ${result.password[0]}`
          );
        }
      }
    });
  };
  // logout
  const handleLogout = () => {
    setIsConnected(false);
  };
  // get peliculas
  useEffect(() => {
    getPeliculas().then((result) => {
      console.log(result);
      setCards(result);
    });
  }, []);

  return (
    <>
      <Layout>
        <ToastAlert
          setShowAlert={setShowAlert}
          show={showAlert}
          title={titleAlert}
          message={messageAlert}
        />
        <Router>
          <NavigationBar
            isConnected={isConnected}
            openModal={handleShow}
            onLogout={handleLogout}
            userId={userId}
          />
          <Switch>
            <Route
              exact
              path="/"
              element={
                <Home cards={cards} userId={userId} isConnected={isConnected} />
              }
            />
            <Route
              path="/movieview/:movieId"
              element={<Movie token={userId} myName={myName} />}
            />
          </Switch>
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
