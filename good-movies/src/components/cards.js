import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import cover from "./../assets/movieCover.jpg";

function Cards(props) {
  // render
  return (
    <Card className="mr-4" bg="light" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={cover} />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{props.movie.titulo}</Card.Title>
        <Link
          className="btn btn-primary btn-block"
          to={`/movieview/${props.movie.id}`}
        >
          Vista previa
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Cards;
