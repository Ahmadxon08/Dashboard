import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useFormik } from "formik";
import useEye from "../../hooks/useEye";
import { useSnackbar } from "notistack";
import { registerValidationSchema } from "../validation";
import { motion } from "framer-motion";
import axios from "axios";
import { main_url } from "../../utils/api";

const rg = "./assets/img/register.jpg";
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { icon1, icon2, inputType1, inputType2 } = useEye();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${main_url}adduser`, {
          userName: values.username,
          passWord: values.password,
        });
        if (res.data.acknowledged) {
          enqueueSnackbar("Registration successful!", { variant: "success" });
          navigate("/login");
          console.log(res.data.acknowledged);
          console.log(values);
        } else if (res.data.error) {
          enqueueSnackbar("Username already exists", { variant: "error" });
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
    <div className="reg">
      <div className="login_body">
        <motion.div
          className="img"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}>
          <img src={rg} alt="" />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="loginForm">
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
                Sign up
              </Button>

              <div className="singUp1">
                <span>Do you have an account?</span>
                <span>
                  <Link to={"/login"}>Sign in</Link>
                </span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
