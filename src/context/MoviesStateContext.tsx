"use client";

import { getMovies } from "@/services/tmdb/movies";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useEffect,
  FC, // Importa el tipo FC para los componentes funcionales
} from "react";

// Definir la interfaz para las películas
interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  backdrop_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

// Definir la interfaz del contexto
interface MoviesStateType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// Crear el contexto con un valor predeterminado
const MoviesStateContext = createContext<MoviesStateType | undefined>(
  undefined,
);

export const MoviesStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Definir el tipo de retorno para getData
  const getData = async (): Promise<void> => {
    const listMovies = await getMovies();
    if (listMovies) {
      setMovies(listMovies);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Memorizar el valor del contexto para evitar renders innecesarios
  const value = useMemo(() => ({ movies, setMovies }), [movies, setMovies]);

  return (
    <MoviesStateContext.Provider value={value}>
      {children}
    </MoviesStateContext.Provider>
  );
};

// Definir el tipo de retorno para useMoviesState
export const useMoviesState = (): MoviesStateType => {
  const context = useContext(MoviesStateContext);
  if (context === undefined) {
    throw new Error(
      "MoviesStateContext must be used within a MoviesStateProvider",
    );
  }
  return context;
};
