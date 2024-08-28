import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteType } from "../types/types";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const routes: RouteType[] = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home",
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "Login",
  },
];

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route: RouteType) => (
          <Route path={route.path} element={route.element} key={route.name} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
