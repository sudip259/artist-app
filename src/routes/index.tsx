// src/routes.ts
import { Navigate, Route, RouteObject, Routes } from "react-router-dom";
import DashboardLayout from "../layout/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";
import Artist from "../pages/Artist";
import Music from "../pages/Music";
import NotFound from "../pages/NotFound";

const dashboardRoutes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: "user", element: <User /> },
  { path: "artist", element: <Artist /> },
  { path: "music", element: <Music /> },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/*",
    element: (
      <DashboardLayout>
        <Routes>
          {dashboardRoutes.map((route: any) => (
            <Route {...route} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    ),
  },
];

export default routes;
