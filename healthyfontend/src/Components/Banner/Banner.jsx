import React, { useState } from 'react'
import './Banner.css'
import banner from '../../../public/banner.png'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

const Banner = ({text,showButton}) => {

 
  return (
    <div className='banner-container'>
       <div className="banner-text">
           <h1>{text}</h1>
           <div className="button-container">
         {showButton && <Link style={{textDecoration:'none'}} to='/service'><button >Service <FaArrowRight /> </button></Link> }
        </div>
       </div>
       
       <div className="banner-image">
         <img src={banner} alt="" />
       </div>
    </div>
  )
}

export default Banner