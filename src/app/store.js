import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";
import userSlice from "../slice/userSlice";

export default configureStore({
    reducer: {
        posts: postSlice,
        user: userSlice
    }
})