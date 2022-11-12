import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    selectedRoom: false,
    messages: []
  },
  reducers: {
    setRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

export const getRoom = (state) => state.chat.selectedRoom;
export const getMessages = (state) => state.chat.messages;
export const { setRoom, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
