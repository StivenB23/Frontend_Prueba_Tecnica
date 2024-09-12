"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useEffect,
  FC,
} from "react";

// Definir la interfaz del contexto
interface AuthStateType {
  userAuth: {
    name: string;
    lastname: string;
    email: string;
  } | null;
  setAuthUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastname: string;
      email: string;
    } | null>
  >;
}

// Crear el contexto con un valor predeterminado
const AuthStateContext = createContext<AuthStateType | undefined>(undefined);

export const AuthStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Obtener datos del localStorage o inicializar como null
  const storedUser: { name: string; lastname: string; email: string } | null =
    JSON.parse(localStorage.getItem("USER") || "null");

  if (storedUser === null) {
    localStorage.setItem("USER", JSON.stringify(storedUser));
  }

  const [userAuth, setAuthUser] = useState<{
    name: string;
    lastname: string;
    email: string;
  } | null>(storedUser);

  useEffect(() => {
    // Guardar el usuario en localStorage cada vez que se actualice
    localStorage.setItem("USER", JSON.stringify(userAuth));
  }, [userAuth]);

  // Memorizar el valor del contexto para evitar renders innecesarios
  const value = useMemo(() => ({ userAuth, setAuthUser }), [userAuth]);

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
};

// Definir el tipo de retorno para useAuthState
export const useAuthState = (): AuthStateType => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthStateProvider");
  }
  return context;
};
