import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_CREATE_USER,
  GET_DOGS_FOR_TEMP,
  GET_DOGS_FOR_BREED,
  GET_DOG_FOR_ID,
  IS_FAVORITE,
  GET_FAVORITES,
  DELETE_FAVORITES,
  CLEAR_BREEDS,
  CLEAR_DETAILS,
} from "./types";
import axios from "axios";

export function clearDetails() {
  return { type: CLEAR_DETAILS };
}

export function clearBreeds() {
  return { type: CLEAR_BREEDS };
}

export function getDogs() {
  return function (dispatch) {
    return axios.get("/dogs/").then((resp) => {
      //   console.log("de action ", resp.data);
      dispatch({ type: GET_DOGS, payload: resp.data });
    });
  };
}

// Get todos los temperamentos
export function getTemperaments() {
  return function (dispatch) {
    return axios.get("/temperaments/").then((resp) => {
      // console.log("de action ", resp.data);
      let respu = resp.data.map((el) => {
        return el.name;
      });
      dispatch({ type: GET_TEMPERAMENTS, payload: respu });
    });
  };
}
//Get dogs creados por el usuario
export function getDogsCreateByUser() {
  return function (dispatch) {
    return axios.get("/dogs/").then((resp) => {
      let aux = resp.data.filter((el) => {
        return el.userCreate === true;
      });

      dispatch({ type: GET_DOGS_CREATE_USER, payload: aux });
    });
  };
}

// Get dogs originarios de la API
export function getDogsForApi() {
  return function (dispatch) {
    return axios.get("/dogs/").then((resp) => {
      let aux = resp.data.filter((el) => {
        return el.userCreate === false;
      });

      dispatch({ type: GET_DOGS_CREATE_USER, payload: aux });
    });
  };
}

// traer los dogs con el temperamento mencionado
export function getDogsForTemperament(temp) {
  return function (dispatch) {
    return axios.get("/dogs/").then((resp) => {
      let aux = resp.data.filter((el) => {
        return el.temperaments && el.temperaments.split(", ").includes(temp);
      });

      dispatch({ type: GET_DOGS_FOR_TEMP, payload: aux });
    });
  };
}

export function getByBreed(breed) {
  // console.log("backend ", breed);
  return function (dispatch) {
    return axios.get(`/dogs?name=` + breed).then((resp) => {
      dispatch({ type: GET_DOGS_FOR_BREED, payload: resp.data });
    });
  };
}

export function getById(id) {
  // console.log("backend id= ", id);
  return function (dispatch) {
    return axios.get(`/dogs/` + id).then((resp) => {
      dispatch({ type: GET_DOG_FOR_ID, payload: resp.data });
    });
  };
}

// _____________________________________________
// POST /dogs/create

export async function createDog(dog) {
  if (dog.image === "") {
    dog.image =
      "https://img.freepik.com/vector-gratis/perro-dibujos-animados-lindo-jack-russell-terrier-perro_52569-889.jpg";
  }
  // console.log(dog);

  return axios.post(`/dogs/`, dog);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE

export async function deleteDog(id, dispatch) {
  return axios.delete(`/dogs/` + id).then((resp) => {
    dispatch({ type: GET_DOGS, payload: resp.data });
  });
}

export function get_Favorites() {
  return (dispatch) => {
    dispatch({ type: GET_FAVORITES });
  };
}

// export async function isFavorite(id) {
//   return axios.delete(`http://localhost:3001/api/dogs/` + id).then((resp) => {
//     dispatch({ type: IS_FAVORITE, payload: resp.data });
//   });
// }
export function isFavorite(id) {
  // console.log("backend id= ", id);
  return function (dispatch) {
    return axios.get(`/dogs/` + id).then((resp) => {
      // console.log("action ", resp.data);
      dispatch({ type: IS_FAVORITE, payload: resp.data });
    });
  };
}

export function delete_Favorites(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_FAVORITES, payload: id });
  };
}
