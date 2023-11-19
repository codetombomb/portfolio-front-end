import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { useState } from "react";
import App from "../App";
import AdminLogin from "../pages/AdminLogin";
import ChatContext from "../context/chatContext";

const AppRoutes = () => {
  /** Future Feature -> Authorized ? Protected Routes + Public : Public only */
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({});

  const onLoginSuccess = (user) => {
    setAdminData(user);
    setIsAdmin(true);
  };

  const element = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLogin onLoginSuccess={onLoginSuccess} />,
    },
    {
      path: "/",
      element: (
        <ChatContext>
          <App adminData={adminData} isAdmin={isAdmin} />
        </ChatContext>
      ),
    },
  ]);

  return <RouterProvider router={element} />;
};

export default AppRoutes;
