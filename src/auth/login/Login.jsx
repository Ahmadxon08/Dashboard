/* eslint-disable react/no-unescaped-entities */

import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

import "react-toastify/dist/ReactToastify.css";

const login = "./assets/img/login.jpg";

const Login = () => {
  // Form validation functions start here
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Username must contain only alphanumeric characters"
        ),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),
    }),
    onSubmit: (values) => {
      if (values.password && values.username) {
        localStorage.setItem("user", JSON.stringify(values));
        console.log(values);
        navigate("/");
      } else {
        navigate("/login");
      }
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;
  // Form validation functions end here

  return (
    <div className="login">
      <div className="img">
        <img src={login} alt="login" />
      </div>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input">
            <TextField
              type="text"
              name="username"
              id="username"
              label="Username"
              variant="outlined"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              style={{
                marginBottom: "20px",
                width: "82%",
              }}
            />
            <span className="err">
              {touched.username && errors.username && errors.username}
            </span>
          </div>
          <div className="input">
            <TextField
              type="password"
              name="password"
              id="password"
              label="Password"
              variant="outlined"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              style={{
                marginBottom: "20px",
                width: "82%",
              }}
            />
            <span className="err">
              {touched.password && errors.password && errors.password}
            </span>
          </div>
          <Button type="submit" variant="contained">
            Sign In
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
