import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const { notification, type } = useNotificationValue();
  if (!notification) return null;

  const styleClass = `notification ${type}`;
  return <p className={styleClass}> {notification}</p>;
};

export default Notification;
