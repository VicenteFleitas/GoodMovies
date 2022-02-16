export function login(props) {
  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: props.email,
      password: props.pass,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://movies.z4.tdplab.com/api/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => console.log("error", error));
  });
  return result;
}

export function getPeliculas() {
  let result = new Promise((resolve) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://movies.z4.tdplab.com/api/pelicula/", requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
  return result;
}

export function getPeliculaById(id) {
  let result = new Promise((resolve) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://movies.z4.tdplab.com/api/pelicula/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
  return result;
}

export function getCriticsById(id) {
  let result = new Promise((resolve) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://movies.z4.tdplab.com/api/pelicula/${id}/criticas`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
  return result;
}

export function getComentsById(id, token) {
  let result = new Promise((resolve) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://movies.z4.tdplab.com/api/pelicula/${id}/comentarios`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => console.log("error", error));
  });
  return result;
}

export function postComents(coment, token) {
  let result = new Promise((resolve) => {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      body: JSON.stringify(coment),
    };

    fetch(`http://movies.z4.tdplab.com/api/comentario/`, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
  return result;
}

export function deleteComment(movieId, commentId, token) {
  let result = new Promise((resolve) => {
    var myHeaders = new Headers();
    myHeaders.append("X-CSRFToken", token);

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://movies.z4.tdplab.com/api/pelicula/${movieId}/comentarios/${commentId}/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
  return result;
}
