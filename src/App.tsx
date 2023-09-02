// src/routes.ts

import React, { useState, useEffect } from "react";
import { Navigate, Route, RouteObject, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layout/Dashboard";
import Artist from "./pages/Artist";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Music from "./pages/Music";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import "./App.css";

type CustomRouteObject = RouteObject & {
  role?: string[]; // Define the role property
};

const RoutesConfig: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch user data from localStorage or an API
    const users: any = localStorage.getItem("users");
    const parsedUsers = JSON.parse(users);
    setLoggedInUser(parsedUsers);
    setLoading(false);
  }, [localStorage.getItem("users")]);
  const getFilteredRoutes = () => {
    const dashboardRoutes: CustomRouteObject[] = [
      {
        index: true,
        element: <Home />,
        role: ["artist", "artist_manager", "super_admin"],
      },
      {
        path: "user",
        element: <User />,
        role: ["super_admin", "artist_manager"],
      },
      {
        path: "artist",
        element: <Artist />,
        role: ["artist_manager", "artist", "super_admin"],
      },
      {
        path: "music",
        element: <Music />,
        role: ["artist", "artist_manager", "super_admin"],
      },
      {
        path: "*",
        element: <NotFound />,
        role: ["artist", "artist_manager", "super_admin"],
      },
    ];

    return dashboardRoutes?.filter((fil) =>
      fil.role?.includes(loggedInUser?.role)
    );
  };

  return (
    <>
      {loading ? <>loading</> : ""}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Routes>
                  {getFilteredRoutes()?.map((route: any) => (
                    <Route key={route.path} {...route} />
                  ))}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RoutesConfig;
