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

const clearTimeouts = () => {
  const highestId = window.setTimeout(() => {
    for (let i = highestId; i >= 0; i--) {
      window.clearInterval(i);
    }
  }, 0);
};

export const showNotification = (text, type, timeInSeconds) => {
  return async (dispatch) => {
    clearTimeouts();
    dispatch(notificationSlice.actions.removeNotification());
    setTimeout(() => {
      dispatch(notificationSlice.actions.setNotification({ text, type }));
      setTimeout(() => {
        dispatch(notificationSlice.actions.removeNotification());
        clearTimeouts();
      }, timeInSeconds * 1000);
    }, 100);
  };
};

export const removeNotifications = () => {
  return (dispatch) => {
    clearTimeouts();
    dispatch(notificationSlice.actions.removeNotification());
  };
};

export default notificationSlice.reducer;
