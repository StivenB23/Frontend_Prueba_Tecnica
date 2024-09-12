import { env } from "@/config/env";

export const apiUrls = {
  user: {
    signup: `${env.API_BACKEND}users/signup`,
  },
  auth: {
    login: `${env.API_BACKEND}auth/login`,
  },
  movies: {
    addMovieFavorite: `${env.API_BACKEND}users/movies/favorites`,
  },
};
