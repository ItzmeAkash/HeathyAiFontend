import React, { useEffect, useState } from "react";
import "./Css/LoginSignup.css";
import userIcon from "/person.png";
import emailIcon from "/email.png";
import passwordIcon from "/password.png";
import Banner from "../Components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  setAction,
  setAuthenticated,
  setInput,
  setLoginErrorMessage,
  setSignupErrorMessage,
  setToken,
} from "../redux/loginSignupReducer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    action,
    emailLogin,
    emailSignup,
    passwordLogin,
    passwordSignup,
    firstName,
    lastName,
    confirmPassword,
    signupErrorMessage,
    loginErrorMessage,
  } = useSelector((state) => state.loginSignup);

  const handleActionChange = (newAction) => {
    dispatch(setAction(newAction));
    dispatch(setSignupErrorMessage(""));
    dispatch(setLoginErrorMessage(""));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setInput({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordSignup !== confirmPassword) {
      toast.error("Passwords do not match", {
        autoClose: 7000,
        toastId: "server-error-toast",
        position: "top-center",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/signup/",
        {
          first_name: firstName,
          last_name: lastName,
          email: emailSignup,
          password: passwordSignup,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success(response.data.messages, {
          autoClose: 7000,
          toastId: "success",
          position: "top-center",
        });
        handleActionChange("Login");
        const fieldsToReset = [
          "firstName",
          "lastName",
          "emailSignup",
          "passwordSignup",
          "confirmPassword",
        ];
        fieldsToReset.forEach((field) =>
          dispatch(setInput({ name: field, value: "" }))
        );
      } else if (response.status === 400) {
        dispatch(setSignupErrorMessage(response.data.messages));
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      handleErrors(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        { email: emailLogin, password: passwordLogin }
      );

      if (response.status === 200) {
        const { access_token } = response.data;
        console.log(access_token);
        localStorage.setItem("token", access_token);
        dispatch(setToken(access_token));
        dispatch(setAuthenticated(true))
        navigation("/");
        dispatch(setInput({ name: "emailLogin", value: "" }));
        dispatch(setInput({ name: "passwordLogin", value: "" }));
        window.scrollTo(0, 0); // Scroll to top after login
      } else if (response.status === 401) {
        dispatch(setLoginErrorMessage(response.data.message)); // Set login error message
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      handleErrors(error);
    }
  };
  const handleErrors = (error) => {
    if (!error.response) {
      toast.error("Failed to connect to the server. Please try again later.", {
        autoClose: 7000,
        toastId: "server-error-toast",
        position: "top-center",
      });
    } else if (error.response && error.response.data) {
      dispatch(setLoginErrorMessage(error.response.data.message));
      console.log(dispatch(setLoginErrorMessage(error.response.data.message)));
    }
  };

  const checkTokenInLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found in localStorage:", token);
      navigation("/");
    } else {
      console.log("Token not found in localStorage");
    }
  };

  useEffect(() => {
    checkTokenInLocalStorage();
  }, []);

  return (
    <>
      <div className="login-container">
        <Banner />
        <div className="login">
          <ToastContainer />
          <form onSubmit={action === "Login" ? handleLogin : handleSubmit}>
            <div className="header">
              <div className="text">{action}</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              {action === "Login" ? null : (
                <>
                  <div className="input">
                    <img src={userIcon} alt="" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={handleInputChange}
                    />
                    <span className="error">
                      {signupErrorMessage.first_name}
                    </span>
                  </div>
                  <div className="input">
                    <img src={userIcon} alt="" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={handleInputChange}
                    />
                    <span className="error">
                      {signupErrorMessage.last_name}
                    </span>
                  </div>
                </>
              )}
              <div className="input">
                <img src={emailIcon} alt="" />
                <input
                  type="email"
                  name={action === "Login" ? "emailLogin" : "emailSignup"}
                  placeholder="Email"
                  value={action === "Login" ? emailLogin : emailSignup}
                  onChange={handleInputChange}
                />
                <span className="error">
                  {action === "Sign Up"
                    ? signupErrorMessage.email
                    : loginErrorMessage.email}
                </span>
              </div>
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input
                  type="password"
                  name={action === "Login" ? "passwordLogin" : "passwordSignup"}
                  placeholder="Password"
                  value={action === "Login" ? passwordLogin : passwordSignup}
                  onChange={handleInputChange}
                />
                <span className="error">
                  {action === "Sign Up"
                    ? signupErrorMessage.password
                    : loginErrorMessage.password}
                </span>
              </div>
              {action === "Login" ? null : (
                <div className="input">
                  <img src={passwordIcon} alt="" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleInputChange}
                  />
                  <span className="error">{signupErrorMessage.password}</span>
                </div>
              )}
            </div>
            {action === "Login" ? (
              <div className="forgot-password">
                forgot password? <span>Click Here</span>
              </div>
            ) : null}
            <div className="submit-container">
              <label
                type="submit"
                className={action === "Login" ? "submit gray" : "submit green"}
                onClick={() => handleActionChange("Sign Up")}
              >
                Register
              </label>
              <label
                type="submit"
                className={
                  action === "Sign Up" ? "submit gray" : "submit green"
                }
                onClick={() => handleActionChange("Login")}
              >
                Login
              </label>
            </div>
            <div className="buttonSubmit">
              <button className="button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
