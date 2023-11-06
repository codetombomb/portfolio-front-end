import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { useState } from "react";
import App from "../App";
import AdminLogin from "../pages/AdminLogin";

const AppRoutes = () => {
  /** Future Feature -> Authorized ? Protected Routes + Public : Public only */
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const onLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAdmin(true);
  };

  const element = createBrowserRouter([
    {
      path: "/",
      element: <App currentUser={currentUser} isAdmin={isAdmin} />,
    },
    {
      path: "/admin",
      element: <AdminLogin onLoginSuccess={onLoginSuccess} />,
    },
  ]);

  return <RouterProvider router={element} />;
};

export default AppRoutes;
