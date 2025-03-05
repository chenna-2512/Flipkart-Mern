import { useState } from "react";
import img from "../assets/loginlogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Bottom from "./Bottom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const goToHome = async () => {
    if (!validateEmail(email)) {
      toast.error("Enter a Valid Email");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/logindata", {
        email,
        password,
      });

      if (response.status === 201) {
        const { token, email, id } = response.data.Loggeduser;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("id", id);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error. Please try again.");
      }
    }
  };

  const goToSignUp = () => navigate("/register");
  const forgotPassword = () => navigate("/forgot");

  return (
    <>
      <Header />
      <Bottom />
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-center justify-center p-5 gap-5">
        <div className="bg-blue-500 p-5 w-full md:w-1/2 text-center rounded-lg">
          <p className="text-4xl pt-5 font-semibold text-white">Login</p>
          <p className="text-gray-100 pt-3">
            Get access to your Orders, <br /> Wishlist and Recommendations.
          </p>
          <img src={img} alt="Login" className="w-1/3 mx-auto mt-5" />
        </div>
        <div className="bg-gray-200 p-6 w-full md:w-1/3 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 m-2 p-2 focus:outline-none focus:ring-0"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 m-2 p-2 focus:outline-none focus:ring-0"
            />
            <button
              className="text-sm font-semibold text-blue-600 mt-2 hover:underline"
              onClick={forgotPassword}
            >
              Forgot Password?
            </button>
            <button
              className="bg-orange-500 text-white p-2 w-full font-semibold mt-3 rounded-md hover:bg-orange-600"
              onClick={goToHome}
            >
              Login
            </button>
            <button
              className="bg-white p-2 w-full font-semibold mt-3 border-2 border-gray-300 rounded-md hover:bg-gray-100"
              onClick={goToSignUp}
            >
              New User? Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;