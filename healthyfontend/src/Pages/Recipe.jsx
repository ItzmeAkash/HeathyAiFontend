import React, { useState } from "react";
import Banner from "../Components/Banner/Banner";
import "./Css/Recipe.css";
import { setInput } from "../feature/recipeGenerator";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../config/config";
import axios from "axios";

const Recipe = (props) => {
  const { recipe } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState(null);


  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(setInput({ name: 'recipe', value }));
  };

  const handleGenerate = async(e) => {
    e.preventDefault();
    try {
       const token =  localStorage.getItem('token'); 
       const response =  await axios.post(`${API_BASE_URL}/service/foodrecipegenerator/`,{
        recipes:recipe.split(",")
       },{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
       });
       console.log(response.data);
       setResponseData(response.data);
       dispatch(setInput({ name: 'recipe', value: '' }));
      
    } catch (error) {
      
    }
    
  };



  return (
    <div className="recipe-container">
      <Banner text={props.text} />
      <div className="recipe-main">
        <div className="recipe">
          <h1>Meet Your Personal AI-Powered Kitchen Assistant</h1>
          <p>
            Simply type a recipe idea or some ingredients you have on hand and
            DishGen's AI will instantly generate an all-new recipe on demand...
          </p>
        </div>
        <div className="recipe-input">
          <input
            type="text"
            placeholder="Chicken, Tomato, etc..."
            value={recipe}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleGenerate}>
            Generate
          </button>
        </div>
        <div className="recipe-result">
          {/* <h1>Food Name</h1> */}
          <div className="recipeoutputs">

            <div className="recipe-instructions">
              { responseData ? responseData.response: null }
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
