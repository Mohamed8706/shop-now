import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false,
}

const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleMenu } = MenuSlice.actions;
export default MenuSlice.reducer;