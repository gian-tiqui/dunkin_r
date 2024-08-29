import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteType } from "../types/types";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteType[] = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home",
    protected: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "Login",
    protected: false,
  },
  {
    path: "/*",
    element: <ErrorPage />,
    name: "NotFound",
    protected: false,
  },
];

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route: RouteType) => (
          <Route
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute element={route.element} />
              ) : (
                route.element
              )
            }
            key={route.name}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
