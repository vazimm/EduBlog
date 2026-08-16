import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ContentPlaceholder from "../pages/ContentPlaceholder";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RequireAuth from "./RequireAuth";
import NotFound from "../pages/NotFound";
//import PostView from "../pages/PostView";
//import RequireRole from "./RequireRole";
//import PostCreate from "../pages/PostCreate";
//import PostEdit from "../pages/PostEdit";
//import Admin from "../pages/Admin";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    element: <RequireAuth />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/conteudo/:disciplina", element: <ContentPlaceholder /> },
          { path: "*", element: <NotFound /> },
          //{ path: "/posts/:id", element: <PostView /> },

          // Quando criar PostCreate/PostEdit/Admin, descomente este bloco:
          // {
          //   element: <RequireRole role="professor" />,
          //   children: [
          //     { path: "/posts/new", element: <PostCreate /> },
          //     { path: "/posts/:id/edit", element: <PostEdit /> },
          //     { path: "/admin", element: <Admin /> },
          //   ],
          // },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
