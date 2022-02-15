import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";

import Layout from "./components/Layout";
import NavigationBar from "./components/NavigationBar";

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
      </Layout>
    </>
  );
}

export default App;
