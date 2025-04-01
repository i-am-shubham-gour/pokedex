import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user?.token) navigate("/auth");
  });

  if (user?.token) {
    return <Outlet>{children}</Outlet>;
  }
};
