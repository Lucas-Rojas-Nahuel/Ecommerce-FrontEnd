import axios from "axios";

const API_URL = "https://fakestoreapi.com";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});



export default apiClient
