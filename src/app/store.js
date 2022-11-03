import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";
import userSlice from "../slice/userSlice";
import projectsSlice from "../slice/projectsSlice";
import loaderSlice from "../slice/loaderSlice";

export default configureStore({
    reducer: {
        posts: postSlice,
        user: userSlice,
        projects: projectsSlice,
        loader: loaderSlice
    }
})