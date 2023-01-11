import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    status: 'idle',
    editProject: null,
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
        },
        initEditProject(state, action){
            const { _id, title, deskripsi, github, imageHeader} = action.payload;
            state.editProject = {
                _id: _id,
                title: title,
                deskripsi: deskripsi,
                github: github,
                imageHeader: imageHeader
            }
        },
        cleanEditProject(state) {
            state.editProject = null
        },
        filterMyProject(state, action) {
            state.projects = state.projects.filter(project => project._id != action.payload );
        }

    },
    extraReducers(builder){
        builder
        .addCase(getProjects.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(getProjects.fulfilled, (state, action) => {
            action.payload.forEach(payload => {
                if(!state.projects.some(project => project._id === payload._id )) {
                    state.projects = state.projects.concat(payload);
                }
            })

            state.status = 'fulllfilled';
        })
    }
})


export const { addProjects, initEditProject, cleanEditProject, filterMyProject } = projectSlice.actions;
export default projectSlice.reducer; 