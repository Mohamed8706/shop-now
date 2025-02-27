import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: JSON.parse(localStorage.getItem("Cart")) || [],
    totalPrice : 0,
    totalItems: 0,
    added: false,
    removed: false,
    isOpen: false
}



const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const product = action.payload.product;
            const exisitngItem = state.items.find((item) => item.id === product.id);
            if (exisitngItem) {
                exisitngItem.count = action.payload.qty
            } 
            else {
            state.items.push({ ...product, count: action.payload.qty || 1 });
            }
            state.added = true;
            localStorage.setItem("Cart", JSON.stringify(state.items))
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("Cart", JSON.stringify(state.items))
        }, 
        calculateTotals : (state) => {
        state.totalPrice = state.items.reduce((total, item) => total + item.price * item.count, 0);
        state.totalItems = state.items.reduce((total, item) => total + item.count, 0)
        },
        handlePopUp: (state, action) => {
        
            if (action.payload === "removing") state.removed = true;
            else if (action.payload === "adding") state.added = true;
            else if (action.payload === "reset"){
                state.added = false;
                state.removed = false;
            }
        },
        openCart: (state, action) => {
            if (action.payload === "open") state.isOpen = true;
            if (action.payload === "close") state.isOpen = false;
        }
    }
})

export const {addToCart, removeFromCart, calculateTotals, handlePopUp, openCart} = CartSlice.actions;
export default CartSlice.reducer;