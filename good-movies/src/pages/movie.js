import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getPeliculaById,
  getCriticsById,
  getComentsById,
  postComents,
  deleteComment,
} from "./../lib/database";
import { timestampToTime } from "./../lib/utils";

import movieCover from "./../assets/movieCover.jpg";
import avatar from "./../assets/avatar.png";

function Movie(props) {
  // vars
  let { movieId } = useParams();
  const [movie, setMovie] = useState({ titulo: "Titulo", etiquetas: [] });
  const [criticas, setCriticas] = useState([]);
  const [coments, setComents] = useState([]);
  // funcs
  useEffect(() => {
    getPeliculaById(movieId).then((res) => {
      setMovie(res);
    });
    getCriticsById(movieId).then((res) => {
      setCriticas(res);
    });
    getComentsById(movieId).then((res) => {
      setComents(res);
    });
  }, [movieId]);

  // add comments
  const commentRef = useRef();
  const scoreRef = useRef();
  function addComment() {
    postComents(
      {
        calificacion: parseInt(scoreRef.current.value),
        mensaje: commentRef.current.value,
        pelicula: parseInt(movieId),
      },
      props.token
    ).then((result) => {
      console.log("Comment added: ", result);
      if (result.usuario) {
        setComents([...coments, result]);
      }
    });
  }
  function handleDeleteComment(commentId) {
    console.log("try delete comment: ", {
      movieId: parseInt(movieId),
      commentId: commentId,
      token: props.token,
    });

    deleteComment(movieId, commentId, props.token).then((result) => {
      console.log("deleteComment: ", result);
      setComents(coments.filter((el) => el.id !== commentId));
    });
  }

  return (
    <Container
      style={{
        marginTop: 120,
      }}
    >
      <Row>
        <Col lg={3}>
          <Image rounded src={movieCover}></Image>
        </Col>
        <Col lg={9}>
          <Row>
            <h2>{movie.titulo}</h2>
          </Row>
          <Row>
            {movie.etiquetas.map((t, i) => (
              <p key={i} className="text-muted mr-4">
                {t}
              </p>
            ))}
          </Row>
          <Row>
            <Col>
              <Row>
                <h4 className="text-muted">Criticas</h4>
              </Row>
              {criticas.map((c, i) => (
                <Row>
                  <p className="text-muted">
                    {c.usuario.last_name} - "{c.mensaje}"
                  </p>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Row>
            <Col>
              <h1>Comentarios</h1>
            </Col>
          </Row>
          {props.myName !== null ? (
            <>
              <Row>
                <Col>
                  <p className="text-muted">
                    Agrega comentario y una calificacion:
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form>
                    <Row>
                      <Col lg={10}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicComent"
                        >
                          <Form.Control
                            ref={commentRef}
                            placeholder="Agrega un comentario..."
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicPoint">
                          <Form.Control
                            ref={scoreRef}
                            placeholder="50"
                            defaultValue={50}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" onClick={addComment}>
                      Publicar
                    </Button>
                  </Form>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
          <Row className="mt-5">
            <Col>
              {coments.map((c, i) => {
                return (
                  <Row key={i}>
                    <Col lg={1}>
                      <Image src={avatar} style={{ width: "64px" }}></Image>
                    </Col>
                    <Col lg={11}>
                      <Row>
                        <Col>
                          <h5>
                            {c.usuario.first_name} {c.usuario.last_name}
                          </h5>
                        </Col>
                        {`${c.usuario.first_name}${c.usuario.last_name}` ==
                        props.myName ? (
                          <Col>
                            <Button onClick={() => handleDeleteComment(c.id)}>
                              Borrar
                            </Button>
                          </Col>
                        ) : (
                          ``
                        )}
                      </Row>
                      <Row>
                        <Col>
                          <p className="text-muted">
                            {timestampToTime(c.creado)}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>{c.mensaje}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Movie;
