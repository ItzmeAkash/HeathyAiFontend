import React, { useState } from 'react';
import './Css/LoginSignup.css';
import userIcon from '/person.png';
import emailIcon from '/email.png';
import passwordIcon from '/password.png';
import Banner from '../Components/Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { setAction, setInput, setLoginErrorMessage, setSignupErrorMessage } from '../redux/loginSignupReducer';
import axios from 'axios';
import { ToastContainer, toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setInput({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordSignup !== confirmPassword) {
      console.log(dispatch(setSignupErrorMessage({ confirmPassword: 'Passwords do not match' })));
        toast.error('Passweord not match',{
          autoClose: 7000,
          toastId: 'server-error-toast',
          position: "top-center"
        })
      
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', {
        first_name: firstName,
        last_name: lastName,
        email: emailSignup,
        password: passwordSignup
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 200) {

        // Registerion Sucess Alert
        toast.success(response.data.messages,{
          autoClose: 7000,
          toastId: 'success',
          position: "top-center"
        })
        handleActionChange('Login')
        console.log(response.data);

        // Reset form fields to empty strings
        dispatch(setInput({ name: 'firstName', value: '' }));
        dispatch(setInput({ name: 'lastName', value: '' }));
        dispatch(setInput({ name: 'emailSignup', value: '' }));
        dispatch(setInput({ name: 'passwordSignup', value: '' }));
        dispatch(setInput({ name: 'confirmPassword', value: '' }));

      } else if (response.status === 400) {
        dispatch(setSignupErrorMessage(response.data.messages))
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.error('Error:', error);

      if (!error.response){
        toast.error('Failed to connect to the server. Please try again later.',{
          autoClose: 7000,
          toastId: 'server-error-toast',
          position: "top-center"
        })
      }
      if (error.response && error.response.data) {
        dispatch(setSignupErrorMessage(error.response.data.messages));
      }
    }
  };



  return (
    <>
      <div className='login-container'>
        <Banner />
        <div className="login">
        <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="header">
              <div className="text">{action}</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              {action === "Login" ? null : (
                <>
                  <div className="input">
                    <img src={userIcon} alt="" />
                    <input type="text" name="firstName" placeholder='First Name' value={firstName} onChange={handleInputChange} />
                    <span className='error'>{signupErrorMessage.first_name}</span>

                  </div>
                  <div className="input">
                    <img src={userIcon} alt="" />
                    <input type="text" name="lastName" placeholder='Last Name' value={lastName} onChange={handleInputChange} />
                    <span className='error'>{signupErrorMessage.last_name}</span>
                  </div>
                </>
              )}
              <div className="input">
                <img src={emailIcon} alt="" />
                <input type="email" name={action === "Login" ? "emailLogin" : "emailSignup"} placeholder='Email' value={action === "Login" ? emailLogin : emailSignup} onChange={handleInputChange} />
                <span className='error'>{action === "Login" ? loginErrorMessage.email : signupErrorMessage.email}</span>
              </div>
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input type="password" name={action === "Login" ? "passwordLogin" : "passwordSignup"} placeholder='Password' value={action === "Login" ? passwordLogin : passwordSignup} onChange={handleInputChange} />
                <span className='error'>{action === "Login" ? loginErrorMessage.password : signupErrorMessage.password}</span>
              </div>
              {action === "Login" ? null : (
                <div className="input">
                  <img src={passwordIcon} alt="" />
                  <input type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={handleInputChange} />
                  <span className='error'>{signupErrorMessage.password}</span>
                </div>
              )}
            </div>
            {action === "Login" ? (
              <div className="forgot-password">
                forgot password? <span>Click Here</span>
              </div>
            ) : null}
            <div className="submit-container">
              <button type="submit" className={action === "Login" ? "submit gray" : "submit green"} onClick={() => handleActionChange('Sign Up')} >Register</button>
              <button type="submit" className={action === "Sign Up" ? "submit gray" : "submit green"} onClick={() => handleActionChange('Login')}  >Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
