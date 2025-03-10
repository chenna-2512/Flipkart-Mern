import { useState } from "react";
import img from "../assets/flipkart logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Address = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [addres, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");

  const addAddress = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token) {
      toast.error("Please login to add your address");
      return;
    }

    const newAddress = {
      id: id,
      name: name,
      phoneno: phoneno,
      pincode: pincode,
      locality: locality,
      address: addres,
      city: city,
      landmark: landmark,
    };

    try {
      const response = await fetch("https://flipkart-mern-1.onrender.com/addresspost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });

      const data = await response.json();
      console.log("Response from server:", data);
      if (data.message.includes("successfully")) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error Adding Address : ", error);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-blue-500 p-4 flex justify-center md:justify-start">
        <img src={img} alt="Flipkart Logo" className="w-20 cursor-pointer" onClick={goToHome} />
      </div>

      <div className="flex flex-col md:flex-row justify-center p-6">
        <div className="bg-blue-500 p-6 w-full md:w-[40%] text-white text-center rounded-lg shadow-lg mb-6 md:mb-0">
          <h1 className="text-2xl font-bold">Fill Your Details</h1>
          <p className="text-sm mt-1">To Get Your Items Delivered</p>
        </div>

        <div className="grid grid-cols-1 p-6 gap-4 w-full md:w-[40%] bg-gray-100 shadow-md rounded-lg">
          <input type="text" placeholder="Name" className="w-full p-3 border rounded-md focus:outline-blue-500" onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Mobile Number" className="w-full p-3 border rounded-md focus:outline-blue-500" onChange={(e) => setPhoneno(e.target.value)} />
          <input type="text" placeholder="Pincode" className="w-full p-3 border rounded-md focus:outline-blue-500" onChange={(e) => setPincode(e.target.value)} />
          <input type="text" placeholder="Locality" className="w-full p-3 border rounded-md focus:outline-blue-500" onChange={(e) => setLocality(e.target.value)} />
          <textarea placeholder="Address" className="w-full p-3 border rounded-md focus:outline-blue-500 resize-none" rows="3" onChange={(e) => setAddress(e.target.value)}></textarea>
          <input type="text" placeholder="City/State/Town" className="w-full p-3 border rounded-md focus:outline-blue-500" onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="Landmark (Optional)" className="w-full p-3 border rounded-md focus:outline-blue-500" onChange={(e) => setLandmark(e.target.value)} />
          <button className="bg-orange-500 text-white p-3 font-semibold rounded-md hover:bg-orange-600 transition-all duration-300" onClick={addAddress}>Add Address</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row text-white bg-black text-sm justify-center items-center md:gap-20 p-5 text-center md:text-left">
        <a href="#" className="flex items-center justify-center gap-2 mb-2 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72" />
          </svg>
          Become a Seller
        </a>
        <h6 className="text-white">&copy; 2007-2025 Flipkart.com</h6>
      </div>
    </>
  );
};

export default Address;
