import axios from 'axios';

const API_URL = 'https://movie.azurewebsites.net/api/cartelera';

export const getPeliculas = async (title = '', ubication = '') => {
  const response = await axios.get(`${API_URL}?title=${title}&ubication=${ubication}`);
  return response.data;
};

export const getPeliculaById = async (imdbID) => {
  const response = await axios.get(`${API_URL}?imdbID=${imdbID}`);
  return response.data;
};

export const crearPelicula = async (pelicula) => {
  const response = await axios.post(API_URL, pelicula);
  return response.data;
};
export const actualizarPelicula = async (pelicula) => {
  // imdbID en la URL y todo el objeto en el body
  const response = await axios.put(`${API_URL}?imdbID=${pelicula.imdbID}`, pelicula);
  return response.data;
};



export const eliminarPelicula = async (imdbID) => {
  const response = await axios.delete(`${API_URL}?imdbID=${imdbID}`);
  return response.data;
};
