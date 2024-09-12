"use client";
import Link from "next/link"; // Cambiado a 'Link' en camelCase
import Image from "next/image"; // Cambiado a 'Image' en camelCase
import styles from "./Header.module.css";
import { useOpenModalState } from "@/context/LoginModalContext";
import { useAuthState } from "@/context/AuthStateContext";
import { useEffect } from "react";

export const Header: React.FC = (): JSX.Element => {
  const { userAuth, setAuthUser } = useAuthState();
  const { isOpenModal, setIsOpenModal } = useOpenModalState();

  useEffect(() => {}, [userAuth]);

  const handleClick = (): void => {
    setIsOpenModal(!isOpenModal);
  };

  const logout = (): void => {
    setAuthUser(null);
    localStorage.removeItem("USER");
    localStorage.removeItem("token");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__nav}>
        <div className={styles.logo}>
          <Image src="/Logo_QuickbetMovie.svg" fill alt="Logo" />
        </div>
        <nav>
          <Link href="">Popular</Link>
          <Link href="">Favorites</Link>
        </nav>
      </div>
      {userAuth !== null ? (
        <div className={styles.container__acount}>
          <div className={styles.iconLogin}>
            <Image src="/Icon_Sesion.png" alt="Logo" fill />
          </div>
          <div className={styles.iconLogin} onClick={logout}>
            <Image src="/Icon_door_exit.svg" alt="Logo" fill />
          </div>
        </div>
      ) : (
        <div className={styles.iconLogin} onClick={handleClick}>
          <Image src="/Icon_Login.svg" alt="Logo" fill />
        </div>
      )}
    </header>
  );
};
