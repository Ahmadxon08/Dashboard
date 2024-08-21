/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import useEye from "../../hooks/useEye";
import { useSnackbar } from "notistack";

const userPc = "./assets/img/userLogin.png";

const Login = () => {
  const navigate = useNavigate();
  const { inputType, icon } = useEye();
  const [isPending, setIsPending] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long")
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
      setIsPending(true);
      setTimeout(() => {
        if (values.username && values.password) {
          localStorage.setItem("user", JSON.stringify(values));
          navigate("/");
        }
        setIsPending(false);
      }, 3000);
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;
  const handlePaste = (e) => {
    e.preventDefault();
    enqueueSnackbar("Pasting is not allowed", { variant: "error" });
  };

  return (
    <div className="login">
      <div className="loginBg">
        <motion.div
          className="ball1"
          animate={{
            x: ["0%", "90%", "0%"],
            y: ["25%", "0%", "25%"],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "loop",
          }}></motion.div>
        <motion.div
          className="ball2"
          animate={{ y: ["10%", "100%", "10%"] }}
          transition={{ duration: 7, repeat: Infinity }}></motion.div>
        <motion.div
          className="ball3"
          animate={{ y: ["0%", "90%", "0%"], x: ["10%", "80%", "10%"] }}
          transition={{ duration: 9, repeat: Infinity }}></motion.div>
        <motion.div
          className="ball4"
          animate={{ x: ["75%", "10%", "75%"], y: ["20%", "100%", "20%"] }}
          transition={{ duration: 8, repeat: Infinity }}></motion.div>
      </div>
      <div className="login_body">
        <div className="img">
          {isPending ? (
            <div className="pend">
              <span>
                Please wait, you will be redirected{" "}
                <span className="span2"> to the home</span> page shortly...
              </span>
            </div>
          ) : (
            <p>
              Wel<span>come</span> back!...
            </p>
          )}
        </div>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <div className="form1">
              <img src={userPc} alt="user" />

              <div className="input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onPaste={handlePaste}
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    marginBottom: "20px",
                    width: "82%",
                  }}
                />
                <span className="err">
                  {touched.username && errors.username}
                </span>
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <div className="pwd">
                  <input
                    type={inputType}
                    id="password"
                    name="password"
                    onPaste={handlePaste}
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      position: "relative",
                    }}
                  />
                  <span> {icon}</span>
                </div>

                <span className="err">
                  {touched.password && errors.password}
                </span>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="glow-on-hover">
                Log In
              </Button>

              <div className="singUp1">
                <span>Don't have an account?</span>

                <Link to={"/register"}>Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
