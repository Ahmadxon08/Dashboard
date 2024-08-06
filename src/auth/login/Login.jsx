/* eslint-disable react/no-unescaped-entities */
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const login = "./assets/img/login.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleClear = (setter) => () => {
    setter("");
  };
  return (
    <div className="login">
      <div className="img">
        <img src={login} alt="" />
      </div>
      <div className="loginForm">
        <form>
          <h1>Login</h1>
          <TextField
            type="text"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear(setUsername)}
                    edge="end"
                    size="small">
                    <IoIosClose size={22} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{
              marginBottom: "20px",
              width: "80%",
            }}
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear(setEmail)}
                    edge="end"
                    size="small">
                    <IoIosClose size={22} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{
              marginBottom: "20px",
              width: "80%",
            }}
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
          <div className="singUp">
            <span>Don't have an account?</span>

            <Link to={"/register"}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
