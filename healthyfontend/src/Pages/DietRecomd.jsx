import React, { useState } from 'react'
import './Css/DietRecomd.css'
import Banner from '../Components/Banner/Banner'


const DietRecomd = (props) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'Sedentary',
    goal: 'Weightloss',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    // Here you can add form validation logic before sending data to the backend
    console.log(formData); // This will log the form data to the console
    // You can use fetch or axios to send formData to your backend
  };
  return (
  <>
      <div className='dietrecomd-contrainer'>
         <Banner text={props.text}/>
       <div className="dietrecomd">
          <h1>Diet Food Recommendation</h1>
          
          <div className="dietrecomd-form">
            <form action='post' onSubmit={handleSubmit}>

            <label>Age
              <input className='agebox' type="number" placeholder='Enter Your Age' name= 'age'value={formData.age} onChange={handleChange} />
            </label>
            <label>Gender
              <select name='gender' value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>Weight
              <input type="number" placeholder='Enter Your Weight' name='weight' value={formData.weight} onChange={handleChange} />
            </label>
            <label>Height
              <input type="number" placeholder='Enter Your Heigth' name='height' value={formData.height} onChange={handleChange} />
            </label>
            <label>Physical activity
              <select name='activityLevel' value={formData.activityLevel} onChange={handleChange}  >
                <option value="Sedentary">Sedentary</option>
                <option value="Lightlyactive">Lightly active</option>
                <option value="Moderatelyactive ">Moderately active</option>
                <option value="Moderatelyactive "> Extremely active</option>
              </select>
            </label>
            <label>Goal
              <select name='goal' value={formData.goal} onChange={handleChange}>
                <option value="Weightloss">Weight Loss </option>
                <option value="Weightgain">Weight Gain</option>
                <option value="MaintainWeight">Maintain Weight</option>
              </select>
            </label>
            <button type='submit'>Submit</button>
          </form>
          </div>
       </div>
      </div>


  </>
  )
}

export default DietRecomd