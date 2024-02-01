import React from 'react'
import './Healthy.css'
import Health from'../../../public/healthybenifits.webp'
import Healthfood from'../../../public/healthyfoods.webp'
import cooldrinks from '../../../public/avoidcooldrinks.webp'
import vegitable from '../../../public/consumeveg.webp'

const Healthy = () => {
  return (
    <div className='container'>
        <div className="health-left">
          <img src={Health} alt="" />
        </div>
        <div className="health-right">
          <h1>The greatest wealth is health</h1>
          <p>"The phrase 'The Greatest Wealth Is Health' succinctly encapsulates the profound belief that one's well-being, encompassing physical, mental, and emotional health, surpasses material wealth in intrinsic value, forming the cornerstone of a fulfilling and meaningful life."</p>
          <div className='health-icon'>
          <div className='health-fruits-icons'>
            <img src={Healthfood} alt="" />
            <p>"To promote a healthy lifestyle, incorporate a variety of fruits into your diet, as they offer a wealth of essential nutrients, antioxidants, and fiber for overall well-being."</p>
          </div>
          <div className='health-cooldrinks-icons'>
            <img src={cooldrinks} alt="" />
            <p>"Promote well-being by choosing healthier beverages over soft drinks, reducing added sugars and artificial additives for a more wholesome lifestyle."</p>
          </div>
          <div className='health-vegitable-icons'>
            <img src={vegitable} alt="" />
            <p>"Optimize your health by incorporating a generous variety of vegetables into your diet, as they provide essential nutrients, fiber, and antioxidants that contribute to overall well-being."</p>
          </div>
          </div>
        </div>

    </div>
  )
}

export default Healthy