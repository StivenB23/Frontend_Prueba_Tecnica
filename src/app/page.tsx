"use client";
import { Banner } from "@/components/home/Banner/Banner";
import { ListMovies } from "@/components/home/ListMovies/ListMovies";
import { SideBarFilter } from "@/components/home/SideBarFilter/SideBarFilter";
import { ModelLogin } from "@/components/shared/ModelLogin/ModelLogin";
import { FavoritesStateProvider } from "@/context/FavoritesStateContext";
import { MoviesStateProvider } from "@/context/MoviesStateContext";
import { useState } from "react";

export default function home(): JSX.Element {
  const [filterMovies, setFilterMovies] = useState({
    search: "",
    genres: "",
    genresName: "",
  });
  return (
    <>
      <Banner />
      <FavoritesStateProvider>
        <ModelLogin />
        <section className="movies__container">
          <MoviesStateProvider>
            <SideBarFilter setFilterMovies={setFilterMovies} />
            <ListMovies filterMovies={filterMovies} />
          </MoviesStateProvider>
        </section>
      </FavoritesStateProvider>
    </>
  );
}
