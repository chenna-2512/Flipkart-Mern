import { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import loginimage from "../assets/loginlogo.png";
import Header from "./Header";
import Bottom from "./Bottom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otp.toString());
    return otp;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please enter all details: Username, Email, Password");
      return;
    }
    const otpToSend = generateOtp();
    try {
      await emailjs.send(
        "service_tth3vuk",
        "template_rilhxya",
        { to_email: email, otp: otpToSend },
        "KHeqyA1SqaXHSe7vT"
      );
      setIsOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const handleOtpValidation = async () => {
    if (otp === generatedOtp) {
      toast.success("OTP validated successfully!");
      const userDetails = { username, email, password };
      try {
        const response = await fetch("https://flipkart-mern-1.onrender.com/postemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        });
        const userdata = await response.json();
        console.log("Response from server:", userdata);
        if (userdata.message.includes("successfully")) {
          toast.error(userdata.message);
        }
      } catch (error) {
        console.log("Error updating details:", error);
      }
      navigate("/login");
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Bottom />
      <ToastContainer />
      <div className="flex flex-col mb-[1%] md:flex-row items-center justify-center p-5 gap-5">
        <div className="bg-blue-500 text-white p-5 w-full md:w-1/2 text-center md:text-left">
          <p className="text-4xl font-semibold">Looks like you are new here</p>
          <p className="text-lg pt-3">Sign Up with Username, Email, and Password</p>
          <img src={loginimage} alt="Login" className="w-1/3 mx-auto md:mx-0 pt-5" />
        </div>
        <div className="bg-gray-200 p-5 w-full md:w-1/2 flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter User Name"
            className="w-full border-b-2 p-2 mb-2 focus:outline-none"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border-b-2 p-2 mb-2 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border-b-2 p-2 mb-2 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-orange-400 text-white p-2 w-full font-semibold mt-2"
            onClick={handleSignup}
            disabled={isOtpSent}
          >
            {isOtpSent ? "OTP Sent!" : "Get OTP"}
          </button>
          <button
            className="bg-white text-black p-2 w-full font-semibold mt-2 border-2 border-gray-300"
            onClick={() => navigate("/login")}
          >
            Existing User? Log In
          </button>
          {isOtpSent && (
            <div className="w-full mt-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border-b-2 p-2 mb-2 focus:outline-none"
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && <p className="text-red-500 text-center">{otpError}</p>}
              <button
                className="bg-green-400 text-white p-2 w-full font-semibold mt-2"
                onClick={handleOtpValidation}
              >
                Validate OTP
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;