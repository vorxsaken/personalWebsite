import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setState(state, action){
            state.isLoading = action.payload;
        },
    }
})

export const { setState } = loaderSlice.actions;
export default loaderSlice.reducer;