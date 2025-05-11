import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state,action) => {
            return action.payload;
        },
        removeFeed: (state,action) => {
            return null;
        },
        removeOneFeed: (state,action) => {
            return state.filter((e)=> e._id != action.payload)
        },
    },
});

export const {addFeed,removeFeed,removeOneFeed} = feedSlice.actions;
export default feedSlice.reducer;