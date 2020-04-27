import { useState, useEffect } from "react";

export const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birth: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
