import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
//import PostView from "../pages/PostView";
//import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      //{ path: "/posts/:id", element: <PostView /> },
      //{ path: "/login", element: <Login /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
