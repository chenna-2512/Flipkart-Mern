import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import img from "../assets/loginlogo.png";
import axios from 'axios';

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }

    axios
      .post("http://localhost:3000/emaildata", { email })
      .then(response => {
        let s = response.data.message;
        if(s == "Email Exists"){
          alert("Email Exists");
        }
      })
      .catch(error => {
        console.error("Error sending OTP:", error);
      });
  };

  return (
    <>
      <Header />
      <div>
        <div className="flex p-5 gap-3 justify-center">
          <div className="bg-blue-500 p-5 w-100">
            <p className="text-4xl pt-5 font-semibold">Update Password</p>
            <p className="text-black-300 pt-3">
              Please verify your email and<br /> Update your password
            </p>
            <img src={img} alt="Login" className="pt-50 pl-17 pb-2" />
          </div>
          <div className="bg-gray-200 p-3">
            <div className="flex flex-col items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
              />
              <button
                className="bg-orange-400 p-2 w-75 font-semibold mt-2"
                onClick={handleSendOtp}
              >
                Get OTP
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgot;
