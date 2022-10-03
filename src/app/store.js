import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";
import userSlice from "../slice/userSlice";
import projectsSlice from "../slice/projectsSlice";

export default configureStore({
    reducer: {
        posts: postSlice,
        user: userSlice,
        projects: projectsSlice,
    }
})