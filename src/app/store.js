import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";

export default configureStore({
    reducer: {
        posts: postSlice
    }
})