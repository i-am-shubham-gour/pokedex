import { Button, CircularProgress } from "@mui/material";
import "./login.scss";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../authContentAPi/authContentApi";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { submitUser, user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      axios
        .post("/user/login", {
          email,
          password: pass,
        })
        .then((resp) => {
          submitUser(resp.data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
          navigate("/");
        });
    },
    [email, navigate, pass, submitUser]
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
