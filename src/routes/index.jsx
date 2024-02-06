import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import App from "../App";
import AdminLogin from "../pages/AdminLogin";
import ChatContext from "../context/chatContext";

const AppRoutes = () => {

  const element = createBrowserRouter([
    {
      path: "/admin-login",
      element: <AdminLogin />
    },
    {
      path: "/admin",
      element: (
        <ChatContext>
          <App />
        </ChatContext>
      ),
    },
    {
      path: "/",
      element: (
        <ChatContext>
          <App />
        </ChatContext>
      ),
    },
  ]);

  return <RouterProvider router={element} />;
};

export default AppRoutes;
