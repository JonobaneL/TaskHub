import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import LogInPage from "@/pages/LogInPage";
import PageWrapper from "@/pages/PageWrapper";
import ProjectPage from "@/pages/ProjectPage";
import SignUpPage from "@/pages/SignUpPage";
import TablesPage from "@/pages/TablesPage";
import TestPage from "@/pages/TestPage";
import UserInfoPage from "@/pages/UserInfoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HubRoutes = () => {
  //add project page - put project nav there and remove it from dashboard. Place home page on the root path
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>Home</h1>,
    },
    {
      path: "/dashboard",
      element: <PageWrapper />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "project/:id",
          element: <ProjectPage />,
          children: [
            {
              path: "tables/",
              element: <TablesPage />,
            },
          ],
        },
        {
          path: "user-info",
          element: <UserInfoPage />,
        },
        {
          path: "test",
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
