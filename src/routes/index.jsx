import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { useState } from "react";
import App from "../App";
import AdminLogin from "../pages/AdminLogin";
import ChatContext from "../context/chatContext";
import { io } from "../context/chatContext";

const LOGOUT_BASE = "https://portfolio-api-ws.onrender.com";
// const LOGOUT_BASE = "http://127.0.0.1:5000"

const AppRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({});

  const onLoginSuccess = (user) => {
    setAdminData(user);
    setIsAdmin(true);
  };

  const onAdminLogout = (admin) => {
    fetch(`${LOGOUT_BASE}/logout/${admin.id}`, { method: "DELETE" }).then(
      (resp) => {
        if (resp.ok) {
          io.emit("removeActiveAdmin", admin);
          setAdminData({});
          setIsAdmin(false);
        }
      }
    );
  };

  const element = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/",
      element: (
        <ChatContext>
          <App
            adminData={adminData}
            isAdmin={isAdmin}
            onAdminLogout={onAdminLogout}
            onLoginSuccess={onLoginSuccess}
          />
        </ChatContext>
      ),
    },
  ]);

  return <RouterProvider router={element} />;
};

export default AppRoutes;
