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

export const setNotification = (notification, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.createNotification(notification));
    setTimeout(
      () => dispatch(notificationSlice.actions.removeNotification()),
      timeInSeconds * 1000
    );
  };
};

export default notificationSlice.reducer;
