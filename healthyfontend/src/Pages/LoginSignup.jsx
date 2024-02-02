import React, { useState } from 'react'
import './Css/LoginSignup.css'
import user_icon from '/person.png'
import email_icon from '/email.png'
import password_icon from '/password.png'
import Banner from '../Components/Banner/Banner'

const LoginSignup = () => {

  const [action,setAction] =  useState("Login")
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
      {action==="Login"?<div></div>:<div className="input">
        <img src={user_icon} alt="" />
        <input type="text" placeholder='Name' />
      </div>}

      <div className="input">
        <img src={email_icon} alt="" />
        <input type="email" placeholder='Email Id' />
      </div>
      <div className="input">
        <img src={password_icon} alt="" />
        <input type="password" placeholder='password' />
      </div>
      {action==="Login"?<div></div>:      <div className="input">
        <img src={password_icon} alt="" />
        <input type="password" placeholder='Confirm Password'/>
      </div>}

     </div>
     {action==="Sign Up"?<div></div>: <div className="forgot-password">
      forgot password? <span>Click Here</span>
     </div>}

     <div className="submit-container">
      <div className={action==="Login"?"submit gray": "submit"} onClick={()=>{setAction('Sign Up')}}>SignUp</div>
      <div className={action==="Sign Up"?"submit gray": "submit"} onClick={()=>{setAction('Login')}}>Login</div>
     </div>
     </div>
     </div>
    </>

  )
}

export default LoginSignup