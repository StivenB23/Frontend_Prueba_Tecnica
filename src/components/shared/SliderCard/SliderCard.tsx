"use client";
import { Card } from "../Card/Card";
import styles from "./SliderCard.module.css";

// Definir las interfaces para las props
interface Movie {
  id: number;
  // Añadir otras propiedades necesarias del movie
}

interface SliderCardProps {
  title: string;
  movies: Movie[];
}

export const SliderCard: React.FC<SliderCardProps> = (props) => {
  const { title, movies } = props;

  return (
    <div className={styles.container__carousel}>
      <h2>{title}</h2>
      <div className={styles.carousel}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
