import React, { useState } from 'react';
import Banner from '../Components/Banner/Banner';
import './Css/FoodImage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '../feature/foodImageSlice';
import { API_BASE_URL } from '../config/config';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
const FoodImage = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null); // Initialize as null

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedImage) {
      // Display toast message
      toast.error("Please select an image.", {

        autoClose: 2000,
        toastId: "image-error-toast",
        position: "top-center",

      });
      setLoading(false); // Set loading to false since no image is selected
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/service/foodimageclassification/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response.data);
      setResponseData(response.data);

    } catch (error) {
      // Handle error here
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);

    }
  }

  return (
    <>
      <div className='foodimage-main-container'>
        <div className="banner-container">
          <Banner text={props.text} />
        </div>
        <div className="foodimage">
          <h1>Food Image Classification</h1>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <div>
            <button onClick={handleSubmit}>Submit</button>

          </div>
        </div>
        <div className="response-container">
          <ToastContainer />
          {loading ? (<div className="loading-animation">
            <ClipLoader color={"#E0FFDE"} loading={loading} size={30} />
          </div>) : (<div className='response-result'>
            {responseData ? <ReactMarkdown className="recipe-markdown">{responseData.response}</ReactMarkdown> : null}

          </div>)}

        </div>
      </div>
    </>
  );
};

export default FoodImage;
