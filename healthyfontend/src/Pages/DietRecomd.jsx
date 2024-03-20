import React, { useEffect, useState, useCallback } from 'react';
import './Css/DietRecomd.css';
import Banner from '../Components/Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage, setInput } from '../redux/dietRecomdSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DietRecomd = ({ text }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { age, gender, weight, height, physicalActivity, goal, errorMessage } = useSelector((state) => state.diet);
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch(setInput({ name, value: value.toString() }));
  }, [dispatch]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://127.0.0.1:8000/api/service/dietrecommendation/", {
        age, gender, weight, height, physical_activity: physicalActivity, goal
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        setResponseData(response.data);
        dispatch(setInput({ name: "age", value: "" }));
        dispatch(setInput({ name: "gender", value: "" }));
        dispatch(setInput({ name: "weight", value: "" }));
        dispatch(setInput({ name: "height", value: "" }));
        dispatch(setInput({ name: "physical_activity", value: "" }));
        dispatch(setInput({ name: "goal", value: "" }));
      }
    } catch (error) {
      dispatch(setErrorMessage(error.response ? error.response.data.error_messages : "An error occurred"));
      console.error(error);
    }
  }, [age, dispatch, gender, height, physicalActivity, goal, weight]);

  useEffect(() => {
    dispatch(setErrorMessage({}));
  }, [dispatch]);

  const renderRecommendedItems = () => {
    const meals = ['breakfast', 'lunch', 'snacks', 'dinner'];

    return meals.map((meal) => (
      <div key={meal}>
        <h3 className='dietresult-h3'>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
        <ul className='dietresult-ul'>
          {responseData.recommended_food_items[meal].map((item, index) => (
            <li className='dietresult-li' key={index}>
              {item.food_items} - {item.Calories} Calories
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const handleReturnToForm = () => {
    setResponseData(null);
  
  };

  return (
    <div className='dietrecomd-contrainer'>
      <Banner text={text} />
      <div className="dietrecomd">
        <h1>Diet Food Recommendation</h1>
        <div className="dietrecomd-form">
          {responseData ? (
            <div className="dietrecomd-result-container">
              <h2 className='dietresult-h2'>Recommended Food Items</h2>
              {renderRecommendedItems()}
              <div className='diet-result-button-div'>
              <button className='diet-result-button' onClick={handleReturnToForm}>Check Again</button>
              </div>
              
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="age">Age
                <input id="age" className='agebox' type="number" placeholder='Enter Your Age' name='age' value={age} onChange={handleInputChange} />
                <span className='error-diet'>{errorMessage.age}</span>
              </label>
              <label htmlFor="gender">Gender
                <select id="gender" name='gender' value={gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </select>
                <span className='error-diet'>{errorMessage.gender}</span>
              </label>
              <label htmlFor="weight">Weight
                <input id="weight" type="number" placeholder='Enter Your Weight' name='weight' value={weight} onChange={handleInputChange} />
                <span className='error-diet'>{errorMessage.weight}</span>
              </label>
              <label htmlFor="height">Height
                <input id="height" type="number" placeholder='Enter Your Height' name='height' value={height} onChange={handleInputChange} />
                <span className='error-diet'>{errorMessage.height}</span>
              </label>
              <label htmlFor="activityLevel">Physical activity
                <select id="activityLevel" name='physicalActivity' value={physicalActivity} onChange={handleInputChange}>
                  <option value="">Select Activity</option>
                  <option value="Sedentray">Sedentary</option>
                  <option value="LightlyActive">Lightly active</option>
                  <option value="ModeratelyActive">Moderately active</option>
                  <option value="ExtremelyActive">Extremely active</option>
                </select>
                <span className='error-diet'>{errorMessage.physical_activity}</span>
              </label>
              <label htmlFor="goal">Goal
                <select id="goal" name='goal' value={goal} onChange={handleInputChange}>
                  <option value="">Select Goal</option>
                  <option value="WeightLoss">Weight Loss </option>
                  <option value="WeightGain">Weight Gain</option>
                  <option value="MaintainWeight">Maintain Weight</option>
                </select>
                <span className='error-diet'>{errorMessage.goal}</span>
              </label>
              <button type='submit'>Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietRecomd;
