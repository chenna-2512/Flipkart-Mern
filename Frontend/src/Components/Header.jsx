/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import img from "../assets/flipkart logo.png";
import search from "../assets/search.png";

const Header = ({ cartItemCount }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/category/${searchQuery}`);
    }
  };

  return (
    <div className="flex flex-row bg-blue-600 items-center justify-center p-4 gap-4 md:gap-10">
      <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => navigate("/")}> 
        <img src={img} alt="flipkart logo" className="w-15" />
        <a href="#" className="font-semibold text-sm md:text-sm">
          Explore <span className="text-orange-400 font-semibold">Plus</span>
        </a>
      </div>

      <div className="flex w-full md:w-1/2 bg-white rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search for Products, Brands and more"
          className="w-full p-2 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-gray-200 p-2">
          <img src={search} alt="search" className="w-6" />
        </button>
      </div>

      <div>
        {isLoggedIn ? (
          <button
            className="bg-white py-1 px-6 font-bold text-red-400 rounded-sm md:px-2 md:text-lg md:font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-white py-1 px-2 font-semibold text-blue-500 rounded-sm md:px-2 md:text-lg md:font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>

      <div
        className="flex items-center text-white font-semibold cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <span className="text-lg ml-1">Cart<sup className="text-yellow-100 p-1">{cartItemCount}</sup></span>
      </div>
    </div>
  );
};

export default Header;
