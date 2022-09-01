import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const getPosts = createAsyncThunk('user/getposts', async () => {
    const get = await fetch('http://localhost:3010/admin/get-posts');
    const posts = await get.json();

    return posts;
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers(builder){
        builder
        .addCase(getPosts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = state.posts.concat(action.payload);
            state.status = 'fullfiled';
        })
    }
})

export default postSlice.reducer