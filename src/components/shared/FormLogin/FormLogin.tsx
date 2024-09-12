"use client";
import { useState } from "react";
import styles from "./FormLogin.module.css";
import Image from "next/image";
import { login } from "@/actions";
import { useAuthState } from "@/context/AuthStateContext";

// Define el tipo de las credenciales para login
interface Credentials {
  email: string;
  password: string;
}

export const FormLogin: React.FC = (): JSX.Element => {
  const { setAuthUser } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const credentials: Credentials = { email, password };
    const data = await login(credentials);
    setAuthUser({
      name: data.user.name,
      lastname: data.user.lastname,
      email: data.user.email,
    });
    localStorage.setItem(
      "USER",
      JSON.stringify({
        name: data.user.name,
        lastname: data.user.lastname,
        email: data.user.email,
      }),
    );
    localStorage.setItem("ACESS_TOKEN", JSON.stringify(data.access_token));
  };

  return (
    <form className={styles.login__form} onSubmit={onLogin}>
      <p>We love having you back</p>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>
          <Image fill src="/Icon_User.svg" alt="" />
        </span>
      </div>
      <div className={styles.input}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={toggleShowPassword}>
          <Image
            fill
            src={showPassword ? "/Icon_Eye_secret.svg" : "/Icon_Eye.svg"}
            alt=""
          />
        </span>
      </div>
      <button type="submit">Continue</button>
      <p>For any questions, reach out to support@Quickbetdmovies.com</p>
    </form>
  );
};
