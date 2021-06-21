import validator from "validator";

export const validateEmail = (input: string) => {
  if (!validator.isEmail(input)) {
    return "Invalid email.";
  }
  return "";
};
