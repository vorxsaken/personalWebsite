import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    adminAccess: false
}

export const authUser = createAsyncThunk('user/auth', async () => {
    var token = null;
    var payload = null;
    if(localStorage.length != 0){
        token = localStorage.getItem("_xvd")
    }
    await fetch('http://localhost:3010/admin/auth', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token
        }
    })
    .then(result => result.json())
    .then((json) => {
        payload = json.adminAccess
    })
    .catch((err) => { console.log(err) })
    
    return payload;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(authUser.fulfilled, (state, action) => {
            state.adminAccess = action.payload;
        })
    }
})

export default userSlice.reducer;