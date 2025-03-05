import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Subcategory = () => {
  const location = useLocation();
  const item = location.state;
  
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token"); 
    const id = localStorage.getItem("id");
  
    if (!token) {
      toast.error("Please login to add the items to cart");
      return;
    }
  
    if (count === 0) return;
  
    const cartItem = {
      id: id,
      title: item.title,
      price: item.price,
      quantity: count,
      image: item.image,
    };
  
    try {
      const response = await fetch("https://flipkart-mern-1.onrender.com/cartpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });
  
      const data = await response.json();
  
      if (data.message.includes("successfully")) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-center p-4 gap-6 w-full max-w-6xl mx-auto">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[50vh] md:w-1/2 border p-2 border-black rounded-xl shadow-lg"
        />
        <div className="flex flex-col p-4 w-full md:w-1/2">
          <h1 className="font-bold text-xl md:text-2xl pb-4 font-serif">
            {item.title} - {item.description} ({item.sub_category})
          </h1>
          <div className="flex items-center gap-1 font-semibold text-lg mt-2">
            <h4 className="flex items-center bg-green-500 text-white p-1 rounded-lg font-semibold">
              ⭐ {item.rating.rate}
            </h4>
            <h4>({item.rating.count} Ratings)</h4>
          </div>
          <h1 className="flex items-center mt-6 text-2xl md:text-3xl font-bold">
            💰 {item.price}
          </h1>
          <div className="flex gap-2 mt-5 p-2 bg-black text-white w-32 md:w-40 items-center justify-center rounded-lg">
            <button onClick={handleIncrement} className="text-xl">➕</button>
            <h2>{count}</h2>
            <button onClick={handleDecrement} className="text-xl">➖</button>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-orange-500 flex items-center justify-center p-4 gap-1 mt-5 rounded-lg font-semibold text-lg w-full md:w-3/4"
              onClick={count > 0 ? addToCart : undefined}
            >
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subcategory;