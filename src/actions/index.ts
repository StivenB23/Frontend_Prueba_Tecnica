"use server";
import { apiUrls } from "@/services/api/urls";
import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  // Define los campos esperados en la respuesta de login
  // Por ejemplo:
  token?: string;
  user?: {
    id: number;
    email: string;
    // Otros campos relevantes
  };
}

export const login = async (
  credentials: Credentials,
): Promise<LoginResponse | undefined> => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${apiUrls.auth.login}`,
      credentials,
    );
    return data;
  } catch (error) {
    return undefined;
  }
};
