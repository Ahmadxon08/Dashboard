/* eslint-disable react/no-unescaped-entities */
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "./Login.scss";

const login = "./assets/img/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleClear = (field) => () => {
    setFormData((prevCredentials) => ({
      ...prevCredentials,
      [field]: "",
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("isLogened", JSON.stringify(formData));

    navigate("/");
  };

  return (
    <div className="login">
      <div className="img">
        <img src={login} alt="" />
      </div>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <TextField
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear("username")}
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
            name="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear("password")}
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
