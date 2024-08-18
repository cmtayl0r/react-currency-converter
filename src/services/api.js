import axios from "axios";

const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default apiClient;
