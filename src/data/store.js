import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "@features/Sidebar/sidebarSlice";
import chatSlice from "@features/Chat/chatSlice";
import startChatSlice from "@features/StartChat/startChatSlice";
import basicUISlice from "@components/basicUISlice";
import userSlice from "@features/Login/userSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    chat: chatSlice,
    startChat: startChatSlice,
    ui: basicUISlice,
    user: userSlice
  }
});

export default store;
