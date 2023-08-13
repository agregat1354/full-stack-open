import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { showNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const { text, type } = useSelector((state) => state.notification);
  if (!text) return null;

  const mapTypeToSeverity = { info: "success", error: "error" };
  const mapTypeToTitle = { info: "Success", error: "Error" };

  return (
    <Alert
      onClose={() => dispatch(showNotification("", null, 0))}
      severity={mapTypeToSeverity[type]}
    >
      <AlertTitle>
        <strong>{mapTypeToTitle[type]}</strong>
      </AlertTitle>
      {text}
    </Alert>
  );
};

export default Notification;
