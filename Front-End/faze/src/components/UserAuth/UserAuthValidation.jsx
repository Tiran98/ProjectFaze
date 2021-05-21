import { useState } from "react";

const initialFormValues = {
    firstName: "",
    email: "",
    formSubmitted: false,
    success: false
  };

export const UserAuthValidation = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
  
    const validate = (fieldValues = values) => {
      let temp = { ...errors };
  
      if ("firstName" in fieldValues)
        temp.fullName = fieldValues.firstName ? "" : "This field is required.";
  
      if ("email" in fieldValues) {
        temp.email = fieldValues.email ? "" : "This field is required.";
        if (fieldValues.email)
          temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
            ? ""
            : "Email is not valid.";
      }

      setErrors({
        ...temp
      });
    };
  
    const handleInputValue = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
      validate({ [name]: value });
    };
  
    const handleSuccess = () => {
      setValues({
        ...initialFormValues,
        formSubmitted: true,
        success: true
      });
    };
  
    const handleError = () => {
      setValues({
        ...initialFormValues,
        formSubmitted: true,
        success: false
      });
    };
  
    const formIsValid = (fieldValues = values) => {
      const isValid =
        fieldValues.firstName &&
        fieldValues.email &&
        Object.values(errors).every((x) => x === "");
  
      return isValid;
    };
  
    return {
      values,
      errors,
      handleInputValue,
      formIsValid
    };
  }

  export default UserAuthValidation;