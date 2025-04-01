import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../auth";
import { PrivateRoute } from "../auth/privateRoute/privateRoute";
import { Dashboard } from "../dashboard/dashboard";

export const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};
