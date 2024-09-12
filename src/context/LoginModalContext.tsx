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
interface LoginModalContextType {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el contexto con un valor predeterminado
const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined,
);

export const LoginModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // Memorizar el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({ isOpenModal, setIsOpenModal }),
    [isOpenModal, setIsOpenModal],
  );

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
};

// Definir el tipo de retorno para useOpenModalState
export const useOpenModalState = (): LoginModalContextType => {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error(
      "LoginModalContext must be used within a LoginModalProvider",
    );
  }
  return context;
};
