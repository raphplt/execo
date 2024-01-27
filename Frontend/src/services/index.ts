import axios from "axios";

// Create an axios instance
export const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
});
