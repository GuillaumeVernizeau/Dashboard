import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import "../styles/Auth.css";

const Register = () => {
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const responseMessage = (response) => {
    const decoded = jwtDecode(response.credential);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      withCredentials: true,
      data: {
        pseudo: decoded.name,
        email: decoded.email,
        password: decoded.email,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(decoded.name);
        } else {
          console.log(decoded.name);
          window.location = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password !== passwordConfirm) {
      passwordConfirmError.innerHTML = "Passwords do not match";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            window.location = "/login";
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login-container">
      <form
        action=""
        onSubmit={handleSubmit}
        id="sign-up-form"
        className="login-form"
      >
        <h1>Register</h1>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
        />
        <div className="pseudo error"></div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <label htmlFor="password-confirm">Confirm Password</label>
        <input
          type="password"
          name="password-confirm"
          id="password-confirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
        <div className="password-confirm error"></div>
        <input type="submit" value="Sign Up" />
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        <Link to="/login" className="register-link">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
