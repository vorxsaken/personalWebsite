import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    status: 'idle',
    error: null
}

export const getProjects = createAsyncThunk('projects/getprojects', async () => {
    const get = await fetch('http://localhost:3010/admin/get-projects');
    const projects = await get.json();
    console.log(projects);
    return projects;
})

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProjects(state, action){
            const { _id, title, deskripsi, github, imageHeader } = action.payload;
            state.projects.push({
                _id: _id,
                title: title,
                deskripsi: deskripsi,
                github: github,
                imageHeader: imageHeader
            })
        }
    },
    extraReducers(builder){
        builder
        .addCase(getProjects.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(getProjects.fulfilled, (state, action) => {
            state.projects = state.projects.concat(action.payload);
            state.status = 'fulllfilled';
        })
    }
})


export const { addProjects } = projectSlice.actions;
export default projectSlice.reducer; 