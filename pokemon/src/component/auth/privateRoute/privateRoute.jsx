import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/auth");
  });

  if (token) {
    return <Outlet>{children}</Outlet>;
  }
};
