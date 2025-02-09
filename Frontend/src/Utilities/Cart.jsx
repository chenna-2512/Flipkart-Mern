import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [perce, setPercent] = useState(0);
  const [before, setBefore] = useState(0);
  const [toItems, setItems] = useState(0);
  const [isLogged, setLoggedIn] = useState(false); // Initially false

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Properly setting login state
  }, []);

  useEffect(() => {
    if (isLogged) {
      axios
        .get("http://localhost:3000/getcartitems")
        .then((response) => {
          const cartdata = response?.data?.data || [];
          updateTotal(cartdata);
          setCart(cartdata);
        })
        .catch((error) => {
          console.log("Error getting data : ", error);
        });
    }
  }, [isLogged]); // Fetch cart items only if logged in

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity < 10) {
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      updateTotal(updatedCart);
    }
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      updateTotal(updatedCart);
    }
  };

  const updateTotal = (updatedCart) => {
    const amount = updatedCart.reduce((curr, item) => curr + item.price * item.quantity, 0);
    const totalQuant = updatedCart.reduce((curr, item) => curr + item.quantity, 0);
    setBefore(amount);
    setItems(totalQuant);
    if (amount > 1000) {
      setTotal(amount);
      setPercent(0);
    } else {
      let price = (50 / 100) * 100;
      let totalAmount = amount + price;
      setTotal(totalAmount);
      setPercent(price);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Header cartItemCount={cart.length} />
      <div>
        {!isLogged ? ( // Fix: Show login prompt when not logged in
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-xl font-bold text-gray-800">Please Login To Access Your Cart</h1>
            <button
              onClick={goToLogin}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="font-[sans-serif] bg-white h-full max-w-7xl max-lg:max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Shopping Bag</h2>
            <div className="flex justify-center items-center gap-6 relative mt-6">
              <div className="lg:col-span-2 space-y-6 w-[80%]">
                {cart.map((item, index) => (
                  <div key={index} className="p-2 bg-white shadow-md relative hover:shadow-lg">
                    <div className="grid sm:grid-cols-2 items-center gap-4">
                      <div className="bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-50 flex items-center justify-center w-full h-full p-4 shrink-0 text-center">
                        <img src={item.image} alt={item.title} className="w-50 h-50 object-contain inline-block" />
                      </div>
                      <div className="p-2">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div className="flex gap-2 items-center bg-black text-lg text-white p-2 rounded-lg w-[16%] mt-4">
                          <h2 onClick={() => handleIncrement(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </h2>
                          <h2>{item.quantity}</h2>
                          <h2 onClick={() => handleDecrement(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                          </h2>
                        </div>
                        <div className="flex items-center flex-wrap gap-1 mt-6">
                          <h4 className="text-lg font-bold text-black">{item.price}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
              <h1 className="text-xl font-bold mb-3">Order Summary</h1>
              <div className="text-lg font-semibold">
                <p className="flex justify-between py-1"><span>Total Amount :</span> {before}</p>
                <p className="flex justify-between py-1"><span>Total Quantity(Items) :</span> {toItems}</p>
                <p className="flex justify-between py-1"><span>Delivery Charges :</span> {perce}</p>
                <p className="border-t mt-2 pt-2 flex justify-between text-xl font-bold"><span>Sub-Total:</span> {total}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
