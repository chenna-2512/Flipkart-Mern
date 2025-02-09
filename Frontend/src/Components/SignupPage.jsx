import { useState } from "react";
import emailjs from "emailjs-com"; // Import emailjs
import { useNavigate } from "react-router-dom";
import loginimage from "../assets/loginlogo.png";
import Header from "./Header";
import Bottom from "./Bottom";
import Footer from "./Footer";

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
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    setGeneratedOtp(otp.toString());
    return otp;
  };

 
  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please enter all details: Username, Email, and Password.");
      return;
    }
    const otpToSend = generateOtp(); 
    

    try {
      await emailjs.send(
        "service_tth3vuk",         // Replace with your Service ID
        "template_rilhxya",        // Replace with your Template ID
        { to_email:email, otp: otpToSend },  // Replace with your template variables
        "KHeqyA1SqaXHSe7vT"             // Replace with your User ID
      );
      setIsOtpSent(true);  
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  // Function to validate OTP
  const handleOtpValidation = async () => {
    if (otp === generatedOtp) {
      alert("OTP validated successfully! and Detailes added successfully");
      
      const userDetails = {
        username : username,
        email : email,
        password : password,
      };

      try{
        const response = await fetch("http://localhost:3000/postemail", {
          method : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        const userdata = await response.json();
        console.log("Response from server : ",userdata);

        if(userdata.message.includes("successfully")){
          alert(userdata.message);
        }
      }catch(error){
        console.log("Error updating details:",error);
      }
      navigate("/login"); 
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <Bottom/>
    <div className="flex p-5 gap-3 justify-center">
      <div className="bg-blue-500 p-5 w-100">
        <p className="text-4xl pt-5 font-semibold">Looks like you're <br /> new here</p>
        <p className="text-black-300 pt-3">Sign Up with Username, Email and Password</p>
        <img src={loginimage} alt="Login" className="pt-50 pl-17 pb-2" />
      </div>
      <div className="bg-gray-200 p-3">
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter User Name"
            className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
            onChange={(e) => setUserName(e.target.value)}
            />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
            onChange={(e) => setPassword(e.target.value)}
            />
          <button
            className="bg-orange-400 p-2 w-75 font-semibold mt-2"
            onClick={handleSignup}
            disabled={isOtpSent}
          >
            {isOtpSent ? "OTP Sent!" : "Get OTP"}
          </button>
          {/* Link to Login Page */}
          <button
            className="bg-white p-2 w-75 font-semibold mt-2 border-b-2"
            onClick={() => navigate("/login")}
            >
            Existing User? Log In
          </button>
          {/* OTP Input and Validation */}
          {isOtpSent && (
            <div className="flex flex-col justify-center mt-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0"
                onChange={(e) => setOtp(e.target.value)}
                />
              {otpError && <p className="text-red-500">{otpError}</p>}
              <button
                className="bg-green-400 p-2 w-75 font-semibold mt-2 items-center"
                onClick={handleOtpValidation}
              >
                Validate OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignupPage;
