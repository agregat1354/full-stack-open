/* eslint-disable indent */
import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      return { notification: "", type: "" };
    default:
      return state;
  }
};

const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    notification: "",
    type: "",
  });

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationHook = useContext(NotificationContext);
  return notificationHook[0];
};

export const useNotificationDispatch = () => {
  const notificationHook = useContext(NotificationContext);
  return notificationHook[1];
};

export const useShowNotification = () => {
  const [, dispatchNotification] = useContext(NotificationContext);

  return (text, type, durationInSeconds) => {
    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: { notification: text, type },
    });
    setTimeout(
      () => dispatchNotification({ type: "REMOVE_NOTIFICATION" }),
      durationInSeconds * 1000
    );
  };
};

export default NotificationContextProvider;
