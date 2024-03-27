import Dashboard from "@/pages/Dashboard";
import TablesPage from "@/pages/TablesPage";
import TestPage from "@/pages/TestPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HubRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "tables/",
          element: <TablesPage />,
        },
      ],
    },
    {
      path: "/test",
      element: <TestPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default HubRoutes;
