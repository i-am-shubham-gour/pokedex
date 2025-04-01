import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
import "./login.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      axiosInstance
        .post("/user/login", {
          email,
          password: pass,
        })
        .then((resp) => {
          const token = resp.data.token;
          sessionStorage.setItem("token", token);
        })
        .catch((err) => {})
        .finally(() => {
          navigate("/");
          setLoading(false);
        });
    },
    [email, navigate, pass]
  );

  return (
    <div className="login-container">
      <div className="login-header">
        <span>Pokedex</span>
      </div>
      <div className="login-body">
        <div className="login-body-container">
          <div className="login-body-content">
            <div className="login-body-header">Login to Pokedex</div>
            <div className="login-body-action">
              <TextField
                className="field"
                variant="outlined"
                placeholder="Email"
                type="email"
                // autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                className="field"
                variant="outlined"
                placeholder="Password"
                type="password"
                // autoComplete="off"
                onChange={(e) => setPass(e.target.value)}
                disabled={loading}
              />
              <Button
                className="login-button"
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                Login
              </Button>
              {loading && <CircularProgress size={30} color="primary" />}
              {loading && <div>PLEASE WAIT WHILE WE ARE SIGNING YOU IN</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
