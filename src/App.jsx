import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/homepage/homePage";
import GoogleCallBack from './Pages/Auth/AuthOperations/GoogleCallBack';
import RequireAuth from "./Pages/Auth/Protecting/requireAuth";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/requireBack";
import Website from "./Pages/Website/website";
import React, { Suspense, lazy } from "react";
import LoadingSubmit from './Components/Loading/loading';
import LogIn from "./Pages/Auth/AuthOperations/login";
import Register from "./Pages/Auth/AuthOperations/register";
import SingleProduct from "./Pages/Website/singleProduct/SingleProductPage";
import Users from './Pages/Dashboard/Users/users';
import UserUpdate from "./Pages/Dashboard/Users/userUpdate";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Categories from "./Pages/Dashboard/Categroies/Categories";
import AddCategory from "./Pages/Dashboard/Categroies/AddCategory";
import CategoryUpdate from "./Pages/Dashboard/Categroies/CategoryUpdate";
import ProductsPage from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import ProductUpdate from "./Pages/Dashboard/Products/ProductUpate";
import { useAuth } from "./hooks/useAuth";
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));






export default function App() {

    return (
        <div className="app">
            <Routes>
                {/* Public Routes */}
                <Route element={<Website />}>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/product/:id" element={<SingleProduct />}></Route>
                </Route>

                <Route path="/auth/google/callback" element={<GoogleCallBack />}></Route>
                <Route path="/*" element={<Err404 />}></Route>


                <Route element={<RequireBack />}>
                    <Route path="/login" element={<LogIn />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Route>


                {/* Protected Routes */}
                <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
                    <Route path="/dashboard/" 
                    element={<Suspense fallback={<LoadingSubmit />}><Dashboard /></Suspense>}>
                        {/* Users */}
                        <Route element={<RequireAuth allowedRole={["1995"]} />}>
                            <Route path="users" element={<Users />} />
                            <Route path="users/:id" element={<UserUpdate />} />
                            <Route path="user/add" element={<AddUser />} />
                        </Route>
                        {/* Categories */}
                        <Route path="categories" element={<Categories />} />
                        <Route path="category/add" element={<AddCategory />} />
                        <Route path="categories/:id" element={<CategoryUpdate />} />
                        {/* Products */}
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="product/add" element={<AddProduct />} />
                        <Route path="products/:id" element={<ProductUpdate />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
