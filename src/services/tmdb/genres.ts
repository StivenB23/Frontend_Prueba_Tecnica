"use server";
import axios from "axios";
import { tmdbUrls } from "./urls";

// Define la interfaz para los géneros
interface Genre {
  id: number;
  name: string;
}

// Define la interfaz para la respuesta de géneros
interface GenresResponse {
  genres: Genre[];
}

// Tipar la función para que devuelva una promesa de un array de géneros o undefined en caso de error
export const getGenres = async (): Promise<Genre[] | undefined> => {
  try {
    const response = await axios.get<GenresResponse>(`${tmdbUrls.genres.all}`, {
      params: {
        api_key: process.env.TMDB_TOKEN,
      },
    });
    return response.data.genres;
  } catch (error) {
    // Manejo de error adecuado
    console.error("Error fetching genres:", error);
    return undefined; // Retorna undefined en caso de error
  }
};
