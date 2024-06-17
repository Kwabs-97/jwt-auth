import axios from "axios";
export const loginHandler = async (data: any) => {
  try {
    const response = await axios.post("http://localhost:8080/login", data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
