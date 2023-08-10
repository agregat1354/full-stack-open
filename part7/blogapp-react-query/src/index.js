import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationContextProvider from "./NotificationContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
);
