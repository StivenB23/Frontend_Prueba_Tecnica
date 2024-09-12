"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  FC,
} from "react";

// Definir la interfaz del contexto
interface FavoritesStateType {
  favorites: any[]; // Cambia el tipo a 'any[]' si no estás seguro del tipo específico
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>; // Cambia el tipo a 'any[]'
}

// Crear el contexto con un valor predeterminado
const FavoritesStateContext = createContext<FavoritesStateType | undefined>(
  undefined,
);

export const FavoritesStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  let dataDefault: any[] = JSON.parse(
    localStorage.getItem("FAVORITES") || "[]",
  );
  if (dataDefault === null) {
    localStorage.setItem("FAVORITES", "[]");
    dataDefault = [];
  }
  const [favorites, setFavorites] = useState<any[]>(dataDefault);

  // Memorizar el valor del contexto para evitar renders innecesarios
  const value = useMemo(() => ({ favorites, setFavorites }), [favorites]);

  return (
    <FavoritesStateContext.Provider value={value}>
      {children}
    </FavoritesStateContext.Provider>
  );
};

// Definir el tipo de retorno para useFavoritesState
export const useFavoritesState = (): FavoritesStateType => {
  const context = useContext(FavoritesStateContext);
  if (context === undefined) {
    throw new Error(
      "FavoritesStateContext must be used within a FavoritesStateProvider",
    );
  }
  return context;
};
