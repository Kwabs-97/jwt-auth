// services/protected.js (Server-Side)
"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const visitProtected = async () => {
  try {
    const response = await axios.get("http://localhost:8080/protected");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
