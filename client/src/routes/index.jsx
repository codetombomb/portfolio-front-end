import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { useState } from "react";
import App from "../App";
import AdminLogin from "../pages/AdminLogin";

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
      path: "/",
      element: <App adminData={adminData} isAdmin={isAdmin} />,
    },
    {
      path: "/admin",
      element: <AdminLogin onLoginSuccess={onLoginSuccess} />,
    },
  ]);

  return <RouterProvider router={element} />;
};

export default AppRoutes;
