import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    editPost: null,
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
        addPost(state, action) {
            const { _id, title, subtitle, imageHeader, text, tags } = action.payload;
            state.posts.push({
                _id: _id,
                title: title,
                subtitle: subtitle,
                imageHeader: imageHeader,
                text: text,
                tags: tags
            })
        },
        initEditPost(state, action) {
            const { _id, title, subtitle, text, tags, imageHeader } = action.payload;
            state.editPost = {
                _id: _id,
                title: title,
                subtitle: subtitle,
                text: text,
                tags: tags,
                imageHeader: imageHeader
            }
        },
        cleanInitEditPost(state) {
            state.editPost = null;
        },
        filterMyStupidPost(state, action){
            state.posts = state.posts.filter(post => post._id != action.payload );
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                action.payload.forEach((posts) => {
                    if (!state.posts.some(post => post._id == posts._id)) {
                        state.posts = state.posts.concat(posts);
                        
                    }
                })
                state.posts = state.posts.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                });
                state.status = 'fullfiled';
            })
    }
})

export const { addPost, initEditPost, cleanInitEditPost, filterMyStupidPost } = postSlice.actions;
export default postSlice.reducer;