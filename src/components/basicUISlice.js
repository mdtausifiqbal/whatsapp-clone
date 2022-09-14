import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    open: false,
    message: "",
    type: "info"
  },
  backdrop: {
    open: false,
    isCancelable: true
  }
};

const basicUISlice = createSlice({
  name: "basicUISlice",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = Object.assign(state.toast, action.payload, { open: true });
    },
    closeToast: (state) => {
      state.toast.open = false;
    },
    showLoading: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.backdrop.open = action.payload;
      } else if (typeof action.payload === "object") {
        state.backdrop = Object.assign(state.backdrop, action.payload);
      }
    }
  }
});

export const toastState = (state) => state.ui.toast;
export const loadingState = (state) => state.ui.backdrop;
export const { showToast, closeToast, showLoading } = basicUISlice.actions;
export default basicUISlice.reducer;
