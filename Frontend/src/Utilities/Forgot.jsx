import { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import img from "../assets/loginlogo.png";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [otpsent, setOtpsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [displayEmail, setDisplay] = useState(false);
  const [updatepassword, setUpdatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    setGeneratedOtp(otp.toString());
    return otp.toString();
  };

  const handleSendOtp = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!validateEmail(normalizedEmail)) {
      alert("Please enter a valid email address!");
      setOtpsent(false);
      return;
    }

    const otpToSend = generateOtp(); // Generate OTP

    setLoading(true); // Show loading
    // Configure EmailJS
    emailjs
      .send(
        "service_tth3vuk", // Replace with your EmailJS Service ID
        "template_rilhxya", // Replace with your EmailJS Template ID
        {
          to_email: normalizedEmail, // Pass email dynamically
          otp: otpToSend, // Pass the generated OTP
        },
        "KHeqyA1SqaXHSe7vT" // Replace with your EmailJS Public Key
      )
      .then((response) => {
        console.log("Email sent successfully:", response.status, response.text);
        alert("OTP sent successfully to your email!");
        setOtpsent(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send OTP. Please try again later.");
        setOtpsent(false);
      })
      .finally(() => {
        setLoading(false); // Hide loading
      });
  };

  const handleValidateOtp = () => {
    if (otp.trim() === generatedOtp) {
      setDisplay(true);
      alert("OTP validated successfully! You can now update your password.");
    } else {
      alert("Invalid OTP. Please try again.");
      setDisplay(false);
    }
  };

  const putPassword = async () => {
    if (updatepassword !== password) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true); // Show loading
    try {
      const response = await fetch(`http://localhost:3000/updatepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(), // Include email in request body
          password: updatepassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password in the backend");
      }

      alert("Password updated successfully!");
      setDisplay(false); // Reset to initial state after password update
      setEmail("");
      setPassword("");
      setUpdatePassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password. Please try again later.");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <>
      <Header />

      {displayEmail ? (
        <>
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
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
                />
                <input
                  type="password"
                  placeholder="Re-Enter Password"
                  value={updatepassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                  className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
                />
                <button
                  className="bg-orange-400 p-2 w-75 font-semibold mt-2 cursor-pointer"
                  onClick={putPassword}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="cursor-pointer">
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
                    className="bg-orange-400 p-2 w-75 font-semibold mt-2 cursor-pointer"
                    onClick={handleSendOtp}
                  >
                    {loading ? "Sending OTP..." : "Get OTP"}
                  </button>
                </div>

                {otpsent && (
                  <div className="flex flex-col justify-center items-center">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-[90%] border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
                    />
                    <button
                      className="bg-green-400 p-2 w-50 font-semibold mt-2 cursor-pointer"
                      onClick={handleValidateOtp}
                    >
                      Validate OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Forgot;