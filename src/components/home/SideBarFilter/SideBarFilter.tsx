"use client";
import { getGenres } from "@/services/tmdb/genres";
import styles from "./SideBarFilter.module.css";
import { useEffect, useState, ChangeEvent } from "react";

// Define las interfaces para las props y géneros
interface Genre {
  id: number;
  name: string;
}

interface SideBarFilterProps {
  setFilterMovies: React.Dispatch<
    React.SetStateAction<{
      search: string;
      genres: string;
      genresName: string;
    }>
  >;
}

export const SideBarFilter: React.FC<SideBarFilterProps> = ({
  setFilterMovies,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = await getGenres();
        setGenres(response as Genre[]); // Asegúrate de que `response` sea del tipo `Genre[]`
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getData();
  }, []);

  const changeValueSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchInput(value);
    setFilterMovies((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const filteredGenresName = (id: string): string => {
    const genre = genres.find((genre) => genre.id.toString() === id);
    return genre ? genre.name : "";
  };

  const changeValueSelectGenres = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setFilterMovies((prev) => ({
      ...prev,
      genres: value,
      genresName: filteredGenresName(value),
    }));
  };

  return (
    <div className={styles.sideBarFilter}>
      <div className={styles.search}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          placeholder="Search..."
          onChange={changeValueSearch}
          value={searchInput}
          id="search"
        />
      </div>
      <div className={styles.filterGeners}>
        <label htmlFor="genres">Genres</label>
        <select id="genres" onChange={changeValueSelectGenres}>
          <option value="">All</option>
          {genres.map((gen) => (
            <option key={gen.id} value={gen.id}>
              {gen.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
