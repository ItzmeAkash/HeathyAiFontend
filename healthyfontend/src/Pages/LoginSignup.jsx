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
import { API_BASE_URL } from "../config/config";

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
 
  // Sign and Login Actions
  const handleActionChange = (newAction) => {
    dispatch(setAction(newAction));
    dispatch(setSignupErrorMessage(""));
    dispatch(setLoginErrorMessage(""));
  };

  // Fetching the input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setInput({ name, value }));
  };

  // Registration Submit
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
      // User Registration 
      const response = await axios.post(
        `${API_BASE_URL}/auth/signup/`,
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

        // Clearing all the input values
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
      
      if(!error.response){
        toast.error('Failed to connect to the server. Please try again later.',{
          autoClose: 7000,
          toastId: 'server-error-toast',
          position: "top-center"
        })
      }
      if(error.response && error.response.data){
        dispatch(setSignupErrorMessage(error.response.data.messages));
    }
  }
    
  };

  // Login handling
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login/`,
        { email: emailLogin, password: passwordLogin }
      );

      if (response.status === 200) {
        const { access_token } = response.data;
        console.log(access_token);

        // Storing Token in Local Storage
        localStorage.setItem("token", access_token);
        dispatch(setToken(access_token));
        dispatch(setAuthenticated(true))

        // Login SuccessFull Redirect to Home page
        navigation("/");

        // Clear the all Value in Login input Fields
        dispatch(setInput({ name: "emailLogin", value: "" }));
        dispatch(setInput({ name: "passwordLogin", value: "" }));
        window.scrollTo(0, 0); 
      } else if (response.status === 401) {
        dispatch(setLoginErrorMessage(response.data.message)); 
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      handleLoginErrors(error);
    }
  };

  // Error Handling
  const handleLoginErrors = (error) => {
    const commonToastSettings = {
      autoClose: 7000,
      position: "top-center",
    };
  
    if (!error.response) {
      toast.error("Failed to connect to the server. Please try again later.", {
        ...commonToastSettings,
        toastId: "server-error-toast",
      });
    } else if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      const specificToastSettings = {
        ...commonToastSettings,
        toastId: errorMessage === "User not found" ? "user-not-found-toast" : "server-error-toast",
      };
  
      if (errorMessage === "User not found") {
        toast.error("User not found. Please sign up.", specificToastSettings);
        handleActionChange("Sign Up");
        dispatch(setInput({ name: "emailLogin", value: "" }));
        dispatch(setInput({ name: "passwordLogin", value: "" }));
      } else {
        dispatch(setLoginErrorMessage(errorMessage));
        toast.error(errorMessage, specificToastSettings);
        console.log(errorMessage);
      }
    }
  };
  
  const checkTokenInLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigation("/");
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
                  {
                     signupErrorMessage.email
                    }
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
                  {signupErrorMessage && signupErrorMessage.password
                    }
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
