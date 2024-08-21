import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import useEye from "../../hooks/useEye";
import { useState } from "react";
import { useSnackbar } from "notistack";
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { icon1, icon2, inputType1, inputType2 } = useEye();
  const [isPending, setIsPending] = useState(false);
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
        .min(3, "Username must be at least 3 characters long")
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
      setIsPending(true);
      setTimeout(() => {
        if (values) {
          localStorage.setItem("user", JSON.stringify(values));
          console.log(values);
          navigate("/login");
        } else {
          navigate("/register");
        }
        setIsPending(false);
      }, 2000);
    },
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const handlePaste = (e) => {
    e.preventDefault();
    enqueueSnackbar("Pasting is not allowed", { variant: "error" });
  };
  return (
    <div className="reg">
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
                Please wait, you will be redirected
                <span className="span2"> to the login</span> page shortly...
              </span>
            </div>
          ) : (
            <p>
              Wel<span>come</span> register!...
              <br />
            </p>
          )}
        </div>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <div className="form1">
              <h1>Create account</h1>

              <div className="input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  label="Username"
                  onPaste={handlePaste}
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
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  onPaste={handlePaste}
                  value={values.email}
                  onBlur={handleBlur}
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
                <label htmlFor="password">Password</label>
                <div className="pwd">
                  <input
                    type={inputType1}
                    id="password"
                    name="password"
                    onBlur={handleBlur}
                    onPaste={handlePaste}
                    value={values.password}
                    onChange={handleChange}
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      position: "relative",
                    }}
                  />
                  <span>{icon1}</span>
                </div>
                <span className="err">
                  {touched.password && errors.password}
                </span>
              </div>
              <div className="input">
                <label htmlFor="confirmPassword"> Confirm password</label>
                <div className="pwd">
                  <input
                    type={inputType2}
                    id="confirmPassword"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onPaste={handlePaste}
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <span>{icon2}</span>
                </div>
                <span className="err">
                  {touched.confirmPassword &&
                    errors.confirmPassword &&
                    errors.confirmPassword}
                </span>
              </div>
              <Button type="submit" variant="contained">
                Register
              </Button>

              <div className="singUp1">
                <span>Do you have an account?</span>
                <Link to={"/login"}>Sign in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
