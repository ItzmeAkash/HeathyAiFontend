import React, { useState } from 'react';
import './Css/LoginSignup.css';
import userIcon from '/person.png';
import emailIcon from '/email.png';
import passwordIcon from '/password.png';
import Banner from '../Components/Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { setAction, setInput,  } from '../redux/loginSignupReducer';

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
     confirmPassword 
    } = useSelector((state) => state.loginSignup);

  const handleActionChange = (newAction) => {
    dispatch(setAction(newAction))
  };



  const handleInputChange = ({ target: { name , value}}) =>{
    dispatch(setInput({ name, value}))
  };


  return (
    <>
      <div className='login-container'>
        <Banner />
        <div className="login">
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
                </div>
                <div className="input">
                  <img src={userIcon} alt="" />
                  <input type="text" name="lastName" placeholder='Last Name' value={lastName} onChange={handleInputChange} />
                </div>
              </>
            )}
            <div className="input">
              <img src={emailIcon} alt="" />
              <input type="email" name={action === "Login" ? "emailLogin" : "emailSignup"} placeholder='Email' value={action === "Login" ? emailLogin : emailSignup} onChange={handleInputChange} />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="" />
              <input type="password" name={action === "Login" ? "passwordLogin" : "passwordSignup"} placeholder='Password' value={action === "Login" ? passwordLogin : passwordSignup} onChange={handleInputChange} />
            </div>
            {action === "Login" ? null : (
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={handleInputChange} />
              </div>
            )}
          </div>
          {action === "Login" ? (
            <div className="forgot-password">
              forgot password? <span>Click Here</span>
            </div>
          ) : null}
          <div className="submit-container">
            <button className={action === "Login" ? "submit gray" : "submit green"} onClick={() => handleActionChange('Sign Up')}>Register</button>
            <button className={action === "Sign Up" ? "submit gray" : "submit green"} onClick={() => handleActionChange('Login')}  >Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
