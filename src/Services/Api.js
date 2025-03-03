import axios from "axios";
import Cookie from "cookie-universal";

export const baseUrl = `https://ecommerce-backend-production-5ad6.up.railway.app/api`;
// Auth
export const REGISTER = "register";
export const LOGIN = "login";
export const LOGOUT = "logout";
// Users
export const USERS = "users";
export const USER = "user";
export const DELETE = "delete"
export const ADD = "add";
// Google Sign 
export const GOOGLE_CALL_BACK = "auth/google/callback";
// Categories
export const CAT = 'categories';
export const Cat = 'category';
// Products 
export const Products = 'products';
export const Product = 'product';
export const LatestSale = "latest-sale"
export const LatestProducts = "latest"
export const TopProducts = "top-rated"
export const Cart = "/cart";

const api = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

const fetchFromApi = async (endpoint) => {
    try {
        const { data } = await api.get(`/${endpoint}`);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed To fetch data";
        throw new Error(message);
    }
}


// USERS
export const logIn = async (credentials) => {
    try {
        const { data } = await api.post(`/${LOGIN}`, credentials);
        const cookie = Cookie();
        cookie.set("e-commerce", data.token); 
        return data.user;
    } catch (error) {
        const message = error.response?.data?.error || "Login failed. Please try again."
        throw new Error(message);
    }
};

export const register = async (credentials) => {
    try {
        const { data } = await api.post(`/${REGISTER}`, credentials);
        const cookie = Cookie();
        cookie.set("e-commerce", data.token); // Store token in cookies
        return data.user;
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed. Please try again.";
        throw new Error(message);
    }
};

export const logOut = async () => {
    try {
        await api.get(`/${LOGOUT}`);
        const cookie = Cookie();
        cookie.remove("e-commerce");
    } catch (error) {
        const message = error.response?.data?.message;
        throw new Error(message);
    }
};

export const fetchUser = () => fetchFromApi(USER)

// CATEGORIES
export const fetchCategories = () => fetchFromApi(CAT)

// PRODUCTS
export const latestSale = () => fetchFromApi(LatestSale);
export const latestProducts = () => fetchFromApi(LatestProducts);
export const topProducts = () => fetchFromApi(TopProducts);

export const fetchProductById = async (id) => {
    if (!id) throw new Error("Product ID is required");

    try {
        const { data } = await api.get(`/${Product}/${id}`);
        return data[0];
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch product");
    }
};