"use client";
import { Card } from "@/components/shared/Card/Card";
import styles from "./ListMovies.module.css";
import { SliderCard } from "@/components/shared/SliderCard/SliderCard";
import { getMoviesPopulars, getMoviesUpComing } from "@/services/tmdb/movies";
import { useMoviesState } from "@/context/MoviesStateContext";
import { useEffect, useState } from "react";

// Define interfaces para las películas y las props
interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  backdrop_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

interface FilterMovies {
  search: string;
  genres: string;
  genresName: string;
}

interface ListMoviesProps {
  filterMovies: FilterMovies;
}

export const ListMovies: React.FC<ListMoviesProps> = ({ filterMovies }) => {
  const { movies } = useMoviesState();
  const [moviesFiltered, setMoviesFiltered] = useState<Movie[]>([]);
  const [moviesPopulated, setMoviesPopulated] = useState<Movie[]>([]);
  const [moviesUpComing, setMoviesUpComing] = useState<Movie[]>([]);

  // Filtrar películas según el filtro aplicado
  useEffect(() => {
    const filteredMovies = movies.filter((movie: Movie) => {
      if (filterMovies.search !== "") {
        return movie.title
          .toLowerCase()
          .includes(filterMovies.search.toLowerCase());
      } else {
        return movie.genre_ids.includes(parseInt(filterMovies.genres, 10));
      }
    });

    setMoviesFiltered(filteredMovies);
  }, [filterMovies, movies]);

  // Obtener datos de películas populares y próximas
  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const moviesPopulars = await getMoviesPopulars();
        const moviesUpcomings = await getMoviesUpComing();
        setMoviesPopulated(moviesPopulars);
        setMoviesUpComing(moviesUpcomings);
      } catch (error) {
        // Eliminar console.error o reemplazarlo con un manejo de errores más adecuado
        // console.error("Error fetching movies:", error);
      }
    };
    getData();
  }, []);

  const isFilterApplied =
    filterMovies.search !== "" || filterMovies.genres !== "";

  return (
    <div className={styles.listMovies}>
      {isFilterApplied && (
        <div>
          <h2>
            Search:{" "}
            {filterMovies.search !== ""
              ? filterMovies.search
              : filterMovies.genresName}
          </h2>
          <div className={styles.container__movies__filtered}>
            {moviesFiltered.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
      <SliderCard title="Popular" movies={moviesPopulated} />
      <SliderCard title="Upcoming" movies={moviesUpComing} />
    </div>
  );
};
