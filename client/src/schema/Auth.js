import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required").min(6).max(20),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match"),
  license: yup
    .string()
    .oneOf(["checked", null], "You must agree to our terms and conditions"),
});

const SignInSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(6).max(20),
});

export { RegisterSchema, SignInSchema };
