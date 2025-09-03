import * as yup from "yup";

const userValidationSchemas = {
  userLogin: yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters long"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long"),
  }),
  userRegister: yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  }),
  userEmail: yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
  }),
  userUpdatePassword: yup.object().shape({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Password confirmation is required"),
  }),
  userUpdateEmail: yup.object().shape({
    newEmail: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
  }),
  userResetPassword: yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    newPassword: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Password confirmation is required"),
  }),  
};

export default userValidationSchemas;
  