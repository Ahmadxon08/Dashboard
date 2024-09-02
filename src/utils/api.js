import axios from "axios";

export const main_url = "http://65.1.136.0:5050/api/";

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

// Get all products from the API
export const allProducts = async () => {
  const res = await axios.get(`${main_url}allproducts`);
  return res.data;
};

// Fetch items from an external API
export const fetchApi = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products;
};

// Search products by name with pagination
export const fetchProductsByName = async (text, pageNum) => {
  const res = await axios.post(`${main_url}productsByName`, { text, pageNum });
  return res.data;
};

// Search products by type with pagination
export const fetchProductsByType = async (rating, isEco, pageNum) => {
  const res = await axios.post(`${main_url}productsByType`, {
    jss: { rating, isEco },
    pageNum,
  });
  return res.data;
};

// Fetch categories with pagination
export const fetchCategories = async (pathDepth, pageNum) => {
  const res = await axios.post(`${main_url}category`, {
    jss: { pathDepth },
    pageNum,
  });
  return res.data;
};
export const verifyUser = async (userData) => {
  try {
    const { data } = await axios.post(`${main_url}verifyuser`, userData);
    return data;
  } catch (error) {
    console.error(
      "Xato yuz berdi:",
      error.response ? error.response.data : error.message
    );
    throw error.response
      ? error.response.data
      : new Error("Noma'lum xatolik yuz berdi");
  }
};
