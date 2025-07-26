import { createSlice } from "@reduxjs/toolkit";
const themeSlice=createSlice({
    name:"him",
    initialState:{theme:'light'},
    reducers:{
        toggleTheme:(state)=>{
            state.theme=state.theme==='light'?'dark':'light'
        }
    }
})
export const {toggleTheme}=themeSlice.actions;
export default themeSlice.reducer;