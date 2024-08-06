/* eslint-disable react/no-unescaped-entities */
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./Register.scss";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

const register = "./assets/img/register.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClear = (field) => () => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: "",
    }));
  };

  const handleChange = (field) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="login">
      <div className="img">
        <img src={register} alt="" />
      </div>
      <div className="loginForm">
        <form>
          <h1>Register</h1>
          <TextField
            type="text"
            id="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleChange("username")}
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
            type="text"
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear("email")}
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
            id="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange("password")}
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
          <TextField
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear("confirmPassword")}
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
            Register
          </Button>
          <div className="singUp">
            <span>Do you have an account?</span>
            <Link to={"/login"}>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
