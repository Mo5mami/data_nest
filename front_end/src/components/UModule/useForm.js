import { useState, useEffect,useContext } from "react";
import {UserContext} from '../../context/UserContext'



export const useForm = (callback, validate,type) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {register,flogin} = useContext(UserContext)

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
      console.log(type)
      if(type==="signup")
      {callback({
        "firstName":values.firstName,
        "lastName":values.lastName,
        "email":values.email,
        "password":values.password
        },register);
      }
      else{
        callback({
          "email":values.email,
          "password":values.password
          },flogin);
      }
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
