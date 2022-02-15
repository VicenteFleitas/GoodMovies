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
