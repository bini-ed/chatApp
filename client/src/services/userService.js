import axios from "axios";
const API = "http://localhost:5000";

export const registerUser = async (data) => {
  return await axios.post(`${API}/registerUser`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API}/login`, data);
};
