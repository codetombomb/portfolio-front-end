import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import App from "../App";

const AppRoutes = () => {
  /** Future Feature -> Authorized ? Protected Routes + Public : Public only */

  const element = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);
  return <RouterProvider router={element} />;
};

export default AppRoutes;
