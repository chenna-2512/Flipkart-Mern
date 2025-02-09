import { useState } from "react";
import img from "../assets/loginlogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Bottom from "./Bottom";
import Footer from "./Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToHome = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logindata", {
        email,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token); // Store token
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Login Error:", error);
        alert(error.response.data.message);
      } else {
        alert("Network Error. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <Bottom />
      <div className="flex p-5 gap-3 justify-center">
        <div className="bg-blue-500 p-5 w-100">
          <p className="text-4xl pt-5 font-semibold">Login</p>
          <p className="text-black-300 pt-3">
            Get access to your Orders, <br /> Wishlist and Recommendations.
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
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
            />
            <button
              className="bg-orange-400 p-2 w-75 font-semibold mt-2"
              onClick={goToHome}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
