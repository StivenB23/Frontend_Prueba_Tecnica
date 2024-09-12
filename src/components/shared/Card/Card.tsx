import Image from "next/image";
import styles from "./Card.module.css";
import { env } from "@/config/env";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { addFavoriteMovie, removeFavoriteMovie } from "@/services/api/movies";
import { useFavoritesState } from "@/context/FavoritesStateContext";
import { useAuthState } from "@/context/AuthStateContext";
import { useCallback } from "react";

interface Movie {
  id: number;
  backdrop_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

interface CardProps {
  movie: Movie;
}

export const Card: React.FC<CardProps> = ({ movie }) => {
  const { favorites, setFavorites } = useFavoritesState();
  const { userAuth } = useAuthState();

  const isFavorite = favorites?.includes(movie.id);

  const calculateRating = useCallback((voteAverage: number): number => {
    return Math.floor(voteAverage * 10);
  }, []);

  const clicFavoriteAdd = async (): Promise<void> => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, movie.id];
      localStorage.setItem("FAVORITES", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });

    if (userAuth) {
      await addFavoriteMovie(movie.id);
    }
  };

  const clicFavoriteRemove = async (): Promise<void> => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((id) => id !== movie.id);
      localStorage.setItem("FAVORITES", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });

    if (userAuth) {
      await removeFavoriteMovie(movie.id);
    }
  };

  const rating = calculateRating(movie.vote_average);
  const pathColor = rating > 60 ? "#4DA14F" : "#FF8800";
  const trailColor = rating > 60 ? "#3f6840" : "#ad5f05";

  return (
    <div className={styles.card}>
      <div className={styles.card__head}>
        <Image
          src={`${env.TMDB_HOSTNAME_IMAGE}${movie.backdrop_path}`}
          alt={`${movie.original_title} backdrop`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.card__body}>
        <h3>{movie.original_title}</h3>
        <p>{movie.release_date}</p>
        <div className={styles.card__body__detail}>
          <div>
            <p>Rating</p>
            <div>
              <CircularProgressbar
                value={rating}
                text={`${rating}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  textSize: "30px",
                  pathColor,
                  trailColor,
                  strokeLinecap: "butt",
                })}
                strokeWidth={6}
              />
            </div>
          </div>
          <div>
            <p>Favorites</p>
            <Image
              onClick={isFavorite ? clicFavoriteRemove : clicFavoriteAdd}
              src={isFavorite ? "/Icon_Heart.svg" : "/Icon_Heart_Outline.svg"}
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
              width={30}
              height={30}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
