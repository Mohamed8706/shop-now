import axios from "axios";
import Cookie from "cookie-universal";



export const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api`;


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
        cookie.set("e-commerce", data.token); 
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

export const UpdateUser = async (id, form) => {
    try {
        await api.post(`/${USER}/edit/${id}`, form
    )} catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
        }
}
export const AddUser = async (form) => {
    try {
        await api.post(`/${USER}/${ADD}`, form
    )} catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}

export const fetchUser = () => fetchFromApi(USER)
export const fetchUsers = (page, limit) => fetchFromApi(`${USERS}?limit=${limit}&page=${page}`);
export const fetchSelectedUser = (id) => fetchFromApi(`${USER}/${id}`);

// CATEGORIES
export const fetchCategories = () => fetchFromApi(CAT)
export const fetchPaginatedCateories = (page, limit) => fetchFromApi(`${CAT}?limit=${limit}&page=${page}`);
export const fetchSelectedCategory = (id) => fetchFromApi(`${Cat}/${id}`);
export const UpdateCategory = async (id, form) => {
    try {
        await api.post(`/${Cat}/edit/${id}`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        )
        
    } catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}
export const AddCategory = async (form) => {
    try {
        await api.post(`/${Cat}/${ADD}`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

    } catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}
// PRODUCTS
export const latestSale = () => fetchFromApi(LatestSale);
export const latestProducts = () => fetchFromApi(LatestProducts);
export const topProducts = () => fetchFromApi(TopProducts);
export const fetchPaginatedProucts = (page, limit) => fetchFromApi(`${Products}?limit=${limit}&page=${page}`);

export const fetchProductById = async (id) => {
    if (!id) throw new Error("Product ID is required");

    try {
        const { data } = await api.get(`/${Product}/${id}`);
        return data[0];
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch product");
    }
};
export const UpdateProduct = async (id, form) => {
    try {
        await api.post(`${Product}/edit/${id}`, form
        )
    } catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}
export const deleteProductImages = async (productIds) => {
    try {
        const requests = await productIds.map((id) => api.delete(`/product-img/${id}`));
        return Promise.all(requests)
    } catch (error) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}

export const uploadProductImage = async (formData, onUploadProgress) => {
    try {
        const response = await api.post(`/product-img/add`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to upload image");
    }
};
export const addInitialProduct = async (form) => {
    try {
        const response = await api.post(`/${Product}/${ADD}`, form
        )
        return response.data
    } catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}
export const editInitialProduct = async ({form, id}) => {
    try {
        await api.post(`/${Product}/edit/${id}`, form)
    } catch (err) {
        const message = err.response?.data?.message;
        throw new Error(message);
    }
}
