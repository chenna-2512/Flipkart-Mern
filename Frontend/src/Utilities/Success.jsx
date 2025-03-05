import React from 'react'
import img from "../assets/flipkart logo.png";
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';


const Success = () => {

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
      }
  return (
    <>
    <div className="bg-blue-500 p-4 flex">
        <img src={img} alt="Flipkart Logo" className="w-20 ml-[15%] cursor-pointer" onClick={goToHome}/>
    </div>
    <div className='flex flex-col m-[12%] text-center font-semibold text-xl font-serif'>
      <h1>Payment Successful</h1>
      <h1>Your Items will be delivered with in 4 days</h1>
    </div>
    <Footer/>
    </>
  )
}

export default Success
