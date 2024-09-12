import { useState } from "react";
import styles from "./FormSignUp.module.css";
import { signUpUser } from "@/services/api/user";

export const FormSignUp: React.FC = (): JSX.Element => {
  // Estados para manejar los valores del formulario
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no son iguales");
      return;
    }

    setError("");
    const response = await signUpUser({ name, lastname, email, password });
    if (!response.success) {
      setError(response.message);
    } else {
      setError("Usuario registrado exitosamente");
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = (): void => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = (): void =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <form className={styles.login__form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={toggleShowPassword}>
          <img
            src={showPassword ? "/Icon_Eye_secret.svg" : "/Icon_Eye.svg"}
            alt="Toggle password visibility"
          />
        </span>
      </div>

      <div className={styles.input}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span onClick={toggleShowConfirmPassword}>
          <img
            src={showConfirmPassword ? "/Icon_Eye_secret.svg" : "/Icon_Eye.svg"}
            alt="Toggle password visibility"
          />
        </span>
      </div>

      <button type="submit">Continue</button>
    </form>
  );
};
