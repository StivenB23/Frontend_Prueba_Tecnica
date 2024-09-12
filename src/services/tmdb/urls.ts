import { env } from "@/config/env";

export const tmdbUrls = {
  movies: {
    all: `${env.TMDB_HOSTNAME}discover/movie`,
    popular: `${env.TMDB_HOSTNAME}movie/popular`,
    upcoming: `${env.TMDB_HOSTNAME}movie/upcoming`,
  },
  genres: {
    all: `${env.TMDB_HOSTNAME}genre/movie/list`,
  },
};
