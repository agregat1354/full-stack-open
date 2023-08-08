import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    0
  );

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

export default NotificationContextProvider;
