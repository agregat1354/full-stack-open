import { useSelector } from "react-redux";

const Notification = () => {
  const { text, type } = useSelector((state) => state.notification);
  if (!text) return null;

  const styleClass = `notification ${type}`;
  return <p className={styleClass}> {text}</p>;
};

export default Notification;
