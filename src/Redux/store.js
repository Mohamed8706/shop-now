import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice"
import menuReducer from "./Slices/MenuSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer
    }
})