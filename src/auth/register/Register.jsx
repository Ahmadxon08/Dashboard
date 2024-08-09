/* eslint-disable react/no-unescaped-entities */
import { Button, TextField } from "@mui/material";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
const register = "./assets/img/register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Username must contain only alphanumeric characters"
        ),
      email: Yup.string()
        .required("Email is required")
        .email("Email must be a valid email address"),

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
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      if (values) {
        localStorage.setItem("user", JSON.stringify(values));
        console.log(values);
        navigate("/login");
      } else {
        navigate("/register");
      }
    },
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  return (
    <div className="login">
      <div className="img">
        <img src={register} alt="" />
      </div>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input">
            <TextField
              type="text"
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              value={values.username}
              onChange={handleChange}
              style={{
                marginBottom: "20px",
                width: "80%",
              }}
            />
            <span className="err">
              {touched.username && errors.username && errors.username}
            </span>
          </div>
          <div className="input">
            <TextField
              type="text"
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              onChange={handleChange}
              style={{
                marginBottom: "20px",
                width: "80%",
              }}
            />
            <span className="err">
              {touched.email && errors.email && errors.email}
            </span>
          </div>
          <div className="input">
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              value={values.password}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              onChange={handleChange}
              style={{
                marginBottom: "20px",
                width: "80%",
              }}
            />{" "}
            <span className="err">
              {touched.password && errors.password && errors.password}
            </span>
          </div>
          <div className="input">
            <TextField
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              value={values.confirmPassword}
              onChange={handleChange}
              style={{
                marginBottom: "20px",
                width: "80%",
              }}
            />{" "}
            <span className="err">
              {touched.confirmPassword &&
                errors.confirmPassword &&
                errors.confirmPassword}
            </span>
          </div>

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
