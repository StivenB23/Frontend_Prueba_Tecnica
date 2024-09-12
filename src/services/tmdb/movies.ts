"use server";
import axios from "axios";
import { tmdbUrls } from "./urls";

// Define la interfaz para la estructura de una película
interface Movie {
  id: number;
  title: string;
  // Añade más propiedades si es necesario
}

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${tmdbUrls.movies.all}`, {
      params: {
        api_key: process.env.TMDB_TOKEN,
      },
    });
    return response.data.results as Movie[]; // Asegúrate de que `response.data.results` sea del tipo `Movie[]`
  } catch (error) {
    return []; // Devuelve un array vacío en caso de error
  }
};

export const getMoviesPopulars = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${tmdbUrls.movies.popular}`, {
      params: {
        api_key: process.env.TMDB_TOKEN,
      },
    });
    return response.data.results as Movie[]; // Asegúrate de que `response.data.results` sea del tipo `Movie[]`
  } catch (error) {
    return []; // Devuelve un array vacío en caso de error
  }
};

export const getMoviesUpComing = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${tmdbUrls.movies.upcoming}`, {
      params: {
        api_key: process.env.TMDB_TOKEN,
      },
    });
    return response.data.results as Movie[]; // Asegúrate de que `response.data.results` sea del tipo `Movie[]`
  } catch (error) {
    return []; // Devuelve un array vacío en caso de error
  }
};
