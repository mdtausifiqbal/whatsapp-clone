import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducer: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const getUser = (state) => state.user.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
