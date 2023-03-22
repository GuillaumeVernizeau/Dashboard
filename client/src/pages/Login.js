import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const responseMessage = (response) => {
    const decoded = jwtDecode(response.credential);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/logingoogle`,
      withCredentials: true,
      data: {
        email: decoded.email,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          window.location = "/";
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
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="email error"></div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="password error"></div>
        <input type="submit" value="Login" />
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          className="google"
        />
        <Link to="/register" className="register-link">
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Login;
