import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must contain only alphanumeric characters"
    ),
  password: Yup.string().required("Password is required"),
  // .min(8, "Password must be at least 8 characters long")
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export const registerValidationSchema = Yup.object({
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
});
