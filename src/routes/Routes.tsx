import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import LogInPage from "@/pages/LogInPage";
import SignUpPage from "@/pages/SignUpPage";
import TablesPage from "@/pages/TablesPage";
import TestPage from "@/pages/TestPage";
import UserInfoPage from "@/pages/UserInfoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HubRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "tables/",
              element: <TablesPage />,
            },
          ],
        },
        {
          path: "/user-info",
          element: <UserInfoPage />,
        },
        {
          path: "/test",
          element: <TestPage />,
        },
      ],
    },
    {
      path: "/log-in",
      element: <LogInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default HubRoutes;
