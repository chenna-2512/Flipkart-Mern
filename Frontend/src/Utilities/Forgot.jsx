import { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import img from "../assets/loginlogo.png";
import { ToastContainer, toast } from 'react-toastify';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [otpsent, setOtpsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [displayEmail, setDisplay] = useState(false);
  const [updatepassword, setUpdatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const checkEmailExists = async (normalizedEmail) => {
    try {
      const response = await axios.post("http://localhost:3000/emaildata", { email: normalizedEmail });
      return response.data.message.toLowerCase() === "email exists";
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  const handleSendOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!validateEmail(normalizedEmail)) {
      toast.error("Enter a valid email");
      return;
    }

    setLoading(true);
    const emailExists = await checkEmailExists(normalizedEmail);
    if (!emailExists) {
      toast.error("Email not found. Please sign up again.");
      setLoading(false);
      return;
    }

    const otpToSend = generateOtp();
    setGeneratedOtp(otpToSend);

    emailjs.send("service_tth3vuk", "template_rilhxya", { to_email: normalizedEmail, otp: otpToSend }, "KHeqyA1SqaXHSe7vT")
      .then(() => {
        toast.success("OTP sent to your email");
        setOtpsent(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send OTP. Try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleValidateOtp = () => {
    if (otp.trim() === generatedOtp) {
      setDisplay(true);
      toast.success("OTP validated successfully");
      toast.success("Update your password");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const putPassword = async () => {
    if (updatepassword !== password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.put("http://localhost:3000/updatepassword", { email: email.trim().toLowerCase(), password: updatepassword });
      toast.success("Password updated successfully");
      setDisplay(false);
      setEmail("");
      setPassword("");
      setUpdatePassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex flex-col mt-[2%] md:flex-row p-4 md:p-5 gap-4 md:gap-6 justify-center items-center">
        {/* Left Section - Image */}
        <div className="bg-blue-500 p-5 w-full md:w-1/3 text-center md:text-left">
          <p className="text-2xl md:text-4xl font-semibold">Update Password</p>
          <p className="text-gray-200 mt-2">Verify your email and update your password</p>
          <img src={img} alt="Login" className="hidden md:block mx-auto mt-5" />
        </div>

        {/* Right Section - Form */}
        <div className="bg-gray-200 p-4 md:p-6 w-full md:w-1/3 rounded-lg shadow-lg">
          {!displayEmail ? (
            <div className="flex flex-col items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full border-b-2 p-2 focus:outline-none focus:ring-0"
              />
              <button 
                className="bg-orange-500 text-white p-2 w-full mt-3 font-semibold rounded-md hover:bg-orange-600 transition-all duration-200"
                onClick={handleSendOtp}
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
              
              {otpsent && (
                <div className="flex flex-col items-center mt-4 w-full">
                  <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    className="w-full border-b-2 p-2 focus:outline-none focus:ring-0"
                  />
                  <button 
                    className="bg-green-500 text-white p-2 w-full mt-3 font-semibold rounded-md hover:bg-green-600 transition-all duration-200"
                    onClick={handleValidateOtp}
                  >
                    Validate OTP
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <input 
                type="password" 
                placeholder="Enter Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full border-b-2 p-2 focus:outline-none focus:ring-0"
              />
              <input 
                type="password" 
                placeholder="Re-Enter Password" 
                value={updatepassword} 
                onChange={(e) => setUpdatePassword(e.target.value)} 
                className="w-full border-b-2 p-2 mt-2 focus:outline-none focus:ring-0"
              />
              <button 
                className="bg-orange-500 text-white p-2 w-full mt-3 font-semibold rounded-md hover:bg-orange-600 transition-all duration-200"
                onClick={putPassword}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgot;
