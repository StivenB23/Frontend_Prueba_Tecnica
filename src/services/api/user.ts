"use server";
import axios from "axios";
import { apiUrls } from "./urls";

// Define una interfaz para el tipo de datos esperados
interface SignUpData {
  email: string;
  password: string;
  // Agrega otros campos según sea necesario
}

// Define una interfaz para el tipo de retorno
interface SignUpResponse {
  success: boolean;
  message?: string; // Opcional, ya que solo se devuelve en caso de error
}

export const signUpUser = async (data: SignUpData): Promise<SignUpResponse> => {
  try {
    // Elimina o comenta el console.log si no es necesario
    // console.log(`${apiUrls.user.signup}`);

    await axios.post(`${apiUrls.user.signup}`, data);
    return { success: true }; // Retorna un estado de éxito
  } catch (error) {
    // Asegúrate de que `error.response.data.message` sea del tipo `string`
    const message = error.response?.data?.message || "Unknown error"; // Valor por defecto
    return { success: false, message }; // Devuelve una respuesta estructurada
  }
};
