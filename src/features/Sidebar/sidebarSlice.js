import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: []
};

const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    }
  }
});

export const { setRooms } = sidebarSlice.actions;
export const getRooms = (state) => state.sidebar.rooms;
export default sidebarSlice.reducer;
