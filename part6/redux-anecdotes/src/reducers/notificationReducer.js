import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(state, { payload }) {
      return payload;
    },
    removeNotification(state, { payload }) {
      return "";
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
