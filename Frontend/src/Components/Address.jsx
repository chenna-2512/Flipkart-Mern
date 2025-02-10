import { useState } from "react";
import img from "../assets/flipkart logo.png";
import { useNavigate } from "react-router-dom";

const Address = () => {

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [phoneno,setPhoneno] = useState("");
    const [pincode,setPincode] = useState("");
    const [locality,setLocality] = useState("");
    const [addres,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [landmark,setLandmark] = useState("");

    const addAddress = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if(!token) {
        alert("Please login to add your address");
        return;
      }

      const newAddress = {
        id:id,
        name:name,
        phoneno:phoneno,
        pincode:pincode,
        locality:locality,
        address:addres,
        city:city,
        landmark:landmark,
      };

      try{
        const response = await fetch("http://localhost:3000/addresspost", {
          method : "POST",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(newAddress),
        });

        const data = await response.json();
        console.log("Response from server:", data);
        if (data.message.includes("successfully")) {
          alert(data.message);
        }
      }catch(error){
        console.log("Error Adding Address : ",error);
      }
    };

    const goToHome = () => {
      navigate("/");
    }

  return (
    <>
      
      <div className="bg-blue-500 p-4 flex">
        <img src={img} alt="Flipkart Logo" className="w-20 ml-[15%] cursor-pointer" onClick={goToHome}/>
      </div>

      <div className="flex justify-center p-6">
        <div className="bg-blue-500 p-6 w-[30%] text-white text-center rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Fill Your Details</h1>
          <p className="text-sm mt-1">To Get Your Items Delivered</p>
        </div>

        <div className="grid grid-cols-1 p-6 gap-4 w-[30%] bg-gray-100 shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            onChange={(e)=>setPhoneno(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            onChange={(e)=>setPincode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Locality"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            onChange={(e)=>setLocality(e.target.value)}
          />
          <textarea
            placeholder="Address"
            className="w-full p-3 border rounded-md focus:outline-blue-500 resize-none"
            rows="3"
            onChange={(e)=>setAddress(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="City/State/Town"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            onChange={(e)=>setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Landmark (Optional)"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            onChange={(e)=>setLandmark(e.target.value)}
          />
          <button className="bg-orange-500 text-white p-3 font-semibold rounded-md hover:bg-orange-600 transition-all duration-300" onClick={addAddress}>
            Add Address
          </button>
        </div>
      </div>

      <div className="flex text-white bg-black text-sm justify-center gap-20 p-5">
            <a href="" className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
                Become a Seller
            </a>
            <a href="" className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
                Advertise
            </a>
            <a href="" className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
                Gift Cards
            </a>
            <a href="" className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
                Help Center
            </a>
            <h6 className="text-white">
            &copy; 2007-2025 Flipkart.com</h6>
        </div>
    </>
  );
};

export default Address;
