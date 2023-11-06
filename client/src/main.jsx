import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AppRoutes />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
