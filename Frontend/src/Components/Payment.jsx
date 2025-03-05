import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import PaymentSection from "./PaymentSection";
import { toast } from "react-toastify";

const Payment = () => {
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(""); 
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    const storedid = localStorage.getItem("id");
    axios
      .get("http://localhost:3000/addressget")
      .then((response) => {
        const address = response?.data?.data || [];
        const filteraddress = address.filter((item) => item.id == storedid);
        setAddress(filteraddress);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const storedid = localStorage.getItem("id");
    axios
      .get("http://localhost:3000/getcartitems")
      .then((response) => {
        const cartdata = response?.data?.data || [];
        const userCart = cartdata.filter((item) => item.id === storedid);
        setCart(userCart);
      })
      .catch((error) => {
        console.log("Error getting data : ", error);
      });
  }, []);

  const handleSelectionChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const deleteItem = async (index) => {
    const itemToRemove = cart[index];
    try {
      const response = await axios.delete(
        `http://localhost:3000/deletedata/${itemToRemove._id}`
      );
      if (response.status === 200) {
        const updatedItems = cart.filter((_, i) => i !== index);
        setCart(updatedItems);
      } else {
        console.error("Failed to remove item. Response:", response);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const paymentcheckout = () => {
    if (selectedAddress.trim() === "") {
      toast.error("Select a valid address");
      return;
    }
    setPayment(true);
  };

  const subtotalAmount = localStorage.getItem("before");
  const deliveryCharges = localStorage.getItem("perce");
  const totalAmount = localStorage.getItem("total");
  const totalItems = localStorage.getItem("toItems");

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row gap-2 justify-center p-4">
        <div className="flex flex-col p-4 w-full md:w-2/3">
          <h1 className="bg-blue-500 p-2 font-semibold text-lg text-white w-full rounded-lg">
            Delivery Address
          </h1>
          <select
            name="address"
            id="address-select"
            className="border-b-2 p-3 focus-visible:outline-none focus:ring-0 cursor-pointer w-full"
            value={selectedAddress}
            onChange={handleSelectionChange}
          >
            <option value=""></option>
            {address.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} {item.address}, {item.locality}, {item.city}-{item.pincode}
              </option>
            ))}
          </select>

          <h1 className="bg-blue-500 p-2 font-semibold text-lg text-white w-full rounded-lg mt-2">
            Order Summary
          </h1>
          <div className="p-2 w-full">
            {cart.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center mb-4"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="ml-0 md:ml-4 flex-1 text-center md:text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <button onClick={() => deleteItem(index)} className="text-red-500 hover:text-red-700">
                      ✖
                    </button>
                  </div>
                  <div className="flex items-center mt-3 justify-center md:justify-start">
                    <span className="mx-1 text-sm text-gray-800 font-monospace">Quantity: {item.quantity}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-gray-900">₹{item.price}</p>
                </div>
              </div>
            ))}
            <button
              className={`items-center ${cart.length > 0 ? "bg-orange-500" : "bg-gray-400 cursor-not-allowed"} 
                p-2 rounded-lg text-md font-semibold w-full flex justify-center`}
              onClick={cart.length > 0 ? paymentcheckout : null}
              disabled={cart.length === 0}
            >
              Proceed To Buy
            </button>
          </div>
          {payment ? <PaymentSection /> : <h1 className="bg-blue-500 p-2 font-semibold text-lg text-white w-full rounded-lg">Payment</h1>}
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md mt-4 md:mt-0">
          <h1 className="text-xl font-bold mb-3">Price Details</h1>
          <div className="text-lg font-semibold space-y-2">
            <p className="flex justify-between"><span>Total Amount:</span> ₹{subtotalAmount}</p>
            <p className="flex justify-between"><span>Total Items:</span> {totalItems}</p>
            <p className="flex justify-between"><span>Delivery Charges:</span> ₹{deliveryCharges}</p>
            <hr className="border-gray-300 my-2" />
            <p className="flex justify-between text-xl font-bold"><span>Grand Total:</span> ₹{totalAmount}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
