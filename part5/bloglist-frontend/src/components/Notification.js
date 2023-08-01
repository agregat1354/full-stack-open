import PropTypes from "prop-types";

const Notification = ({ text, typeClass }) => {
  if (!text) return null;

  const styleClass = `notification ${typeClass}`;
  return <p className={styleClass}> {text}</p>;
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  typeClass: PropTypes.string.isRequired,
};

export default Notification;
