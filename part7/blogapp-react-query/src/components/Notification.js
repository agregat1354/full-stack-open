import Alert from "react-bootstrap/Alert";
import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const { notification, type } = useNotificationValue();

  const variantMap = { error: "danger", info: "success" };
  let variant = variantMap[type];

  if (!notification) return null;

  return <Alert variant={variant}>{notification}</Alert>;
};

export default Notification;
