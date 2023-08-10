import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { text: "", type: "" },
  reducers: {
    set: (state, { payload }) => {
      return { text: payload.text, type: payload.type };
    },
    remove: () => {
      return { text: "", type: "" };
    },
  },
});

export const showNotification = (text, type, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.set({ text, type }));
    setTimeout(
      () => dispatch(notificationSlice.actions.remove()),
      timeInSeconds * 1000
    );
  };
};

export default notificationSlice.reducer;
