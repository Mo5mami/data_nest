import validator from "validator";

export default function validateLogin(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be more than 8 characters";
  }

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!values.username) {
    errors.username = "User name is required";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "ConfirmPassword is required";
  } else if (!(values.password === values.confirmPassword)) {
    errors.confirmPassword = "Passwords aren't equal ";
  }

  if (!validator.isBefore(values.birth)) {
    errors.birth = "the date is invalid";
  }

  return errors;
}
