import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { text: "", type: "" },
  reducers: {
    setNotification: (state, { payload }) => {
      return { text: payload.text, type: payload.type };
    },
    removeNotification: () => {
      return { text: "", type: "" };
    },
  },
});

export const showNotification = (text, type, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification({ text, type }));
    setTimeout(
      () => dispatch(notificationSlice.actions.removeNotification()),
      timeInSeconds * 1000
    );
  };
};

export default notificationSlice.reducer;
