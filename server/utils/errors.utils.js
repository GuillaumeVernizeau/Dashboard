module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo"))
    errors.pseudo = "Wrong pseudo or already taken";
  if (err.message.includes("email"))
    errors.email = "Wrong email or already taken";
  if (err.message.includes("password"))
    errors.password = "Wrong password (min 6 characters)";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already taken";
  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email unknown";
  if (err.message.includes("password")) errors.password = "Wrong password";
  return errors;
};
