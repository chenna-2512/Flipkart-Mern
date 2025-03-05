import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [perce, setPercent] = useState(0);
  const [before, setBefore] = useState(0);
  const [toItems, setItems] = useState(0);
  const [isLogged, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const storedid = localStorage.getItem("id");
    if (isLogged) {
      axios
        .get("http://localhost:3000/getcartitems")
        .then((response) => {
          const cartdata = response?.data?.data || [];
          const userCart = cartdata.filter((item) => item.id === storedid);
          updateTotal(userCart);
          setCart(userCart);
        })
        .catch((error) => console.log("Error getting data:", error));
    }
  }, [isLogged]);

  const deleteItem = async (index) => {
    const itemToRemove = cart[index];
    try {
      const response = await axios.delete(
        `http://localhost:3000/deletedata/${itemToRemove._id}`
      );
      if (response.status === 200) {
        const updatedItems = cart.filter((_, i) => i !== index);
        setCart(updatedItems);
        updateTotal(updatedItems);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleIncrement = async (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity < 10) {
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      updateTotal(updatedCart);

      try {
        await axios.put("http://localhost:3000/putcartdata", {
          id: updatedCart[index].id,
          title: updatedCart[index].title,
          quantity: updatedCart[index].quantity,
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleDecrement = async (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      updateTotal(updatedCart);

      try {
        await axios.put("http://localhost:3000/putcartdata", {
          id: updatedCart[index].id,
          title: updatedCart[index].title,
          quantity: updatedCart[index].quantity,
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
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
      let price = amount > 0 ? (50 / 100) * 100 : 0;
      setTotal(amount + price);
      setPercent(price);
    }
  };

  const goToCheckout = () => {
    if (total > 0) {
      navigate("/payment");
    } else {
      toast.error("Please add items before proceeding to payment!");
    }
  };

  const goToLogin = () => navigate("/login");
  // const goToOrders = () => navigate("/orders");
  const goToAddress = () => navigate("/address");

  localStorage.setItem("total", total);
  localStorage.setItem("perce", perce);
  localStorage.setItem("before", before);
  localStorage.setItem("toItems", toItems);

  return (
    <>
      <Header cartItemCount={cart.length} />
      <ToastContainer />

      <div className="min-h-screen bg-gray-100 py-10 px-2">
        {!isLogged ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-gray-800">Please Login To Access Your Cart</h1>
            <button
              onClick={goToLogin}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Shopping Cart</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-6">
                {cart.map((item, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center">
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                        <button onClick={() => deleteItem(index)} className="text-red-500 hover:text-red-700">
                          ✖
                        </button>
                      </div>
                      <div className="flex items-center mt-3">
                        <button onClick={() => handleDecrement(index)} className="px-3 py-1 bg-gray-300 rounded-lg">-</button>
                        <span className="mx-3 text-lg">{item.quantity}</span>
                        <button onClick={() => handleIncrement(index)} className="px-3 py-1 bg-gray-300 rounded-lg">+</button>
                      </div>
                      <p className="mt-2 text-lg font-semibold text-gray-900">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-3">Order Summary</h1>
                <p className="flex justify-between"><span>Total Amount:</span> ₹{before}</p>
                <p className="flex justify-between"><span>Total Items:</span> {toItems}</p>
                <p className="flex justify-between"><span>Delivery Charges:</span> ₹{perce}</p>
                <hr className="border-gray-300 my-2" />
                <p className="flex justify-between text-xl font-bold"><span>Grand Total:</span> ₹{total}</p>

                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={goToAddress}>
                  Add Address
                </button>
                <button className="w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800" onClick={goToCheckout}>
                  Place Order
                </button>
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
