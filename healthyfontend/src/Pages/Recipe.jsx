import React, { useState } from "react";
import Banner from "../Components/Banner/Banner";
import "./Css/Recipe.css";
import { setInput } from "../feature/recipeGenerator";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import {  ClipLoader  } from "react-spinners"; 

const Recipe = (props) => {
  const { recipe } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(setInput({ name: 'recipe', value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/service/foodrecipegenerator/`, {
        recipes: recipe.split(",")
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      setResponseData(response.data);
      dispatch(setInput({ name: 'recipe', value: '' }));

    } catch (error) {

    } finally {
      setLoading(false); 
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
          {loading ? ( 
            <div className="loading-animation">
              <ClipLoader  color={"#E0FFDE"} loading={loading} size={30} /> 
            </div>
          ) : (
            <div className="recipeoutputs">
              <div className="recipe-instructions">
                {responseData ? responseData.response : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
