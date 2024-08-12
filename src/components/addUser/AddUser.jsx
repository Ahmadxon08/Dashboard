import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useApiContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./AddUser.scss";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const AddUser = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showAddUser, addUser, handleAddCloser } = useApiContext();
  const { enqueueSnackbar } = useSnackbar(); // Corrected here

  const formik = useFormik({
    initialValues: {
      userName: "",
      passWord: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Username is required")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Username must contain only alphanumeric characters"
        ),
      passWord: Yup.string()
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
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await addUser(values);
        enqueueSnackbar("User added successfully", { variant: "success" }); // Corrected here
        handleAddCloser();
        navigate("/users");
      } catch (error) {
        enqueueSnackbar("Error adding user: " + error.message, {
          variant: "error",
        }); // Corrected here
        console.error("Error adding user:", error);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Modal
      show={showAddUser}
      onHide={handleAddCloser}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t("users.addUser")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal1">
        <form onSubmit={formik.handleSubmit}>
          <div className="input">
            <TextField
              type="text"
              id="userName"
              name="userName"
              label={t("header.username")}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              value={formik.values.userName}
              onChange={formik.handleChange}
              style={{ marginBottom: "20px", width: "80%" }}
            />
            <span className="err">
              {formik.touched.userName && formik.errors.userName}
            </span>
          </div>
          <div className="input">
            <TextField
              type="password"
              id="passWord"
              name="passWord"
              label={t("header.password")}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.passWord && Boolean(formik.errors.passWord)}
              value={formik.values.passWord}
              onChange={formik.handleChange}
              style={{ marginBottom: "20px", width: "80%" }}
            />
            <span className="err">
              {formik.touched.passWord && formik.errors.passWord}
            </span>
          </div>
          <div className="line"></div>
          <div className="add_footer">
            <Button variant="text" onClick={handleAddCloser} className="btn1">
              {t("users.cancel")}
            </Button>
            <Button
              variant="text"
              type="submit"
              className="btn2"
              disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUser;
