import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationContextProvider from "./NotificationContext.js";
import UserContextProvider from "./UserContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
);
