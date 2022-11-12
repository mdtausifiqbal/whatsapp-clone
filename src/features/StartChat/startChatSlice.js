import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogOpen: false
};

const startChatSlice = createSlice({
  name: "startChatSlice",
  initialState,
  reducers: {
    setDialogOpen: (state, action) => {
      state.dialogOpen = action.payload;
    }
  }
});

export const getDialogOpen = (state) => state.startChat.dialogOpen;
export const { setDialogOpen } = startChatSlice.actions;

export default startChatSlice.reducer;
