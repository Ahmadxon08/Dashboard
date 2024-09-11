/* eslint-disable react/no-unescaped-entities */
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useFormik } from "formik";
import useEye from "../../hooks/useEye";
import { useSnackbar } from "notistack";
import axios from "axios";
import { motion } from "framer-motion";
import { loginValidationSchema } from "../validation";

const userPc = "./assets/img/loginn.jpg";
const loginleft = "./assets/img/loginLeft.png";

const Login = () => {
  const navigate = useNavigate();
  const { inputType, icon } = useEye();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    onSubmit: async (values) => {
      try {
        const res = await axios.post(`http://65.1.136.0:5050/api/verifyuser`, {
          userName: values.username,
          passWord: values.password,
        });

        if (res.data?.verifyResult === "passed" && res.data?.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(values));
          console.log(res.data);

          console.log(res.data.token, JSON.stringify(values));

          enqueueSnackbar("Login successful!", { variant: "success" });
          navigate("/");
        } else {
          enqueueSnackbar("Invalid username or password, please try again.", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Something went wrong, please try again.", {
          variant: "error",
        });
      }
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
      <div className="loginBg"></div>
      <div className="login_body">
        <motion.div
          className="img"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}>
          <img src={loginleft} alt="login" />
        </motion.div>
        <motion.div
          className="loginForm"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}>
          <form onSubmit={handleSubmit}>
            <div className="form1">
              <img src={userPc} alt="user" />
              <h2>Log in</h2>

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
                {"Log In"}
              </Button>

              <div className="singUp1">
                <span>Don't have an account?</span>

                <Link to={"/register"}>Sign up</Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
