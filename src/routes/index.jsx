import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import App from "../App";
import AdminLogin from "../pages/AdminLogin";
import ChatContext from "../context/chatContext";
import MobileContext from "../context/mobileContext";

const AppRoutes = () => {
  const element = createBrowserRouter([
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/admin",
      element: (
        <ChatContext>
          <MobileContext>
            <App />
          </MobileContext>
        </ChatContext>
      ),
    },
    {
      path: "/",
      element: (
        <ChatContext>
          <MobileContext>
            <App />
          </MobileContext>
        </ChatContext>
      ),
    },
  ]);

  return <RouterProvider router={element} />;
};

export default AppRoutes;
