const Notification = ({ text, typeClass }) => {
  if (!text) return null;

  const styleClass = `notification ${typeClass}`;
  return <p className={styleClass}> {text}</p>;
};

export default Notification;
