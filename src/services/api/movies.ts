import axios from "axios";

// Define el tipo para el id de la película
type MovieId = string | number;

// Tipar la función para que no devuelva nada (void)
export const addFavoriteMovie = async (idMovie: MovieId): Promise<void> => {
  const TOKEN = JSON.parse(
    localStorage.getItem("ACESS_TOKEN") || '""',
  ) as string;

  try {
    await axios.post(
      `http://localhost:3300/api/users/movies/favorites`,
      { favorites: idMovie },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  } catch (error) {
    // Manejo de error adecuado
    console.error("Error adding favorite movie:", error);
  }
};

// Tipar la función para que no devuelva nada (void)
export const removeFavoriteMovie = async (idMovie: MovieId): Promise<void> => {
  const TOKEN = JSON.parse(
    localStorage.getItem("ACESS_TOKEN") || '""',
  ) as string;

  try {
    await axios.delete(
      `http://localhost:3300/api/users/movies/favorites/${idMovie}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  } catch (error) {
    // Manejo de error adecuado
    console.error("Error removing favorite movie:", error);
  }
};
