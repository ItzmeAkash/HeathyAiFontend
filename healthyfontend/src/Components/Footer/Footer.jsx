import React from 'react'
import './Footer.css'
import logo from '/logo.png'
import instgram from '/instagram_icon.png'
import whatsapp from '/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer-contrainer'>
     <div className="footer-logo">
      <img src={logo} alt="" />
     </div>
     <ul className="footer-links">
      <li>Company</li>
      <li>Serices</li>
      <li>About</li>
      <li>Contact</li>
     </ul>
     <div className="footer-social-icon">
      <div className="footer-icon-contrainer">
        <img src={instgram} alt="" />
      </div>
      <div className="footer-icon-contrainer">
        <img src={whatsapp} alt="" />
      </div>
     </div>
     <div className="footer-copyright">
      <hr />
      <p>Copyright &copy; 2024 - All Right Reserved</p>
     </div>
    </div>
  )
}

export default Footer