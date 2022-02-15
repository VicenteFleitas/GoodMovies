import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPeliculaById, getCriticsById } from "./../lib/database";

import movieCover from "./../assets/movieCover.jpg";

function Movie() {
  // vars
  let { movieId } = useParams();
  const [movie, setMovie] = useState({ titulo: "Titulo", etiquetas: [] });
  const [criticas, setCriticas] = useState([]);
  // funcs
  useEffect(() => {
    getPeliculaById(movieId).then((res) => {
      setMovie(res);
    });
    getCriticsById(movieId).then((res) => {
      setCriticas(res);
    });
  }, [movieId]);

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
    </Container>
  );
}

export default Movie;
