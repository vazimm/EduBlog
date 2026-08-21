import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ContentPlaceholder from "../pages/ContentPlaceholder";
import Discipline from "../pages/Discipline";
import Home from "../pages/Home";
import PostView from "../pages/PostView";
import SearchResults from "../pages/SearchResults";
import Login from "../pages/Login";
import RequireAuth from "./RequireAuth";
import NotFound from "../pages/NotFound";

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
          { path: "/conteudo/:disciplina", element: <Discipline /> },
          { path: "/posts/:id", element: <PostView /> },
          { path: "/busca", element: <SearchResults /> },
          { path: "/favoritos", element: <ContentPlaceholder title="Favoritos" /> },
          { path: "/sobre", element: <ContentPlaceholder title="Sobre" /> },
          { path: "/professores", element: <ContentPlaceholder title="Professores" /> },
          { path: "/metodologia", element: <ContentPlaceholder title="Metodologia" /> },
          { path: "/privacidade", element: <ContentPlaceholder title="Política de privacidade" /> },
          { path: "/termos", element: <ContentPlaceholder title="Termos de uso" /> },
          { path: "*", element: <NotFound /> },

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
