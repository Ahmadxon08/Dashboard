// utils/api.js

import axios from "axios";
const main_url = "http://65.1.136.0:5050/api/";

// Fetch all users
export const fetchUsers = async () => {
  const res = await axios.get(`${main_url}allusers`);
  return res.data;
};

// Add user
export const addUser = async (newUser) => {
  const res = await axios.post(`${main_url}adduser`, newUser);
  return res.data;
};

// Check if user exists
export const checkUserExists = async (userName) => {
  const res = await axios.get(`${main_url}allusers`, {
    params: { username: userName },
  });
  return res.data.exists;
};

// Fetch items from an external API
export const fetchApi = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products;
};
