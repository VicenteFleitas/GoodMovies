import React from "react";
import { Toast } from "react-bootstrap";

function ToastAlert(props) {
  return (
    <div>
      <Toast
        delay={4000}
        autohide
        onClose={() => props.setShowAlert(false)}
        show={props.show}
        style={{
          position: "absolute",
          top: 100,
          right: 10,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastAlert;
