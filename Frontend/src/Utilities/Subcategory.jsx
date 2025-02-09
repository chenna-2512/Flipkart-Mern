import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";

const Subcategory = () => {
  const location = useLocation();
  const item = location.state;
  
  const [cart, setCart] = useState([]);
  const [count,setcount] = useState(0);

  const handleIncrement = () => {
    if(count>=0 && count<10){
      setcount(count+1);
    }
  }
  const handleDecrement = () => {
    if(count>0 && count<=10){
      setcount(count-1);
    }
  }

  const addToCart = async () => {
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }
  
    if (count === 0) return; 
  
    const cartItem = {
      title: item.title,
      price: item.price,
      quantity: count, 
      image: item.image,
    };
  
    try {
      const response = await fetch("http://localhost:3000/cartpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cartItem),
      });
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      if (data.message.includes("successfully")) {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
  
  return (
    <>
      <Header />
      <div className="flex cursor-pointer justify-center items-center p-4 gap-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-90 h-100 border-1 p-2 border-black rounded-xl hover:shadow-lg"
        />
        <div className="flex flex-col p-4 w-100">
          <h1 className="font-bold text-2xl pb-4 font-serif">
            {item.title} - {item.description} ({item.sub_category})
          </h1>
          <div className="flex item-center gap-1 font-semibold text-lg mt-2">
            <h4 className="flex items-center bg-green-500 text-white p-1 rounded-lg font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              {item.rating.rate}
            </h4>
            <h4>({item.rating.count} Ratings)</h4>
          </div>
          <h1 className="flex items-center mt-6 text-3xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                clipRule="evenodd"
              />
            </svg>
            {item.price}
          </h1>
          <div className="flex gap-2 mt-5 p-2 bg-black text-white w-25 items-center justify-center rounded-lg">
            <h2 onClick={handleIncrement}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg></h2>
            <h2>{count}</h2>
            <h2 onClick={handleDecrement}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
            </h2>
          </div>
          <div className="flex justify-center">
          <button className="bg-orange-500 flex items-center justify-center p-4 gap-1 mt-5 rounded-lg font-semibold text-lg w-75"
            onClick={()=>count>0 && addToCart()}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
            Add To Cart
          </button>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subcategory;
