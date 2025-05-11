import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state,action) => action.payload,
        removeRequests: () => null,
        removeOneRequest: (state,action) => {
            return state.filter((e)=> e._id != action.payload)
        }
    },
})

export const {addRequests,removeRequests,removeOneRequest} = requestSlice.actions;
export default requestSlice.reducer;