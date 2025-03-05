import { useState } from "react";
import Phonepay from "./Phonepay";
import CreditCard from "./CreditCard";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentSection = () => {

  const navigate = useNavigate(); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [phonepay, setPhonepay] = useState(false);
  const [paytm, setPaytm] = useState(false);
  const [card, setCard] = useState(false);
  const [cash, setCash] = useState(false);
  const total = localStorage.getItem("total");

  const handlePaymentMethodChange = (event) => {
    const paymentMethod = event.target.value;
    setSelectedPaymentMethod(paymentMethod);
  
    const paymentMethods = ["Phone Pay", "Paytm", "Card", "Cash on Delivery"];
    const setters = [setPhonepay, setPaytm, setCard, setCash];
  
    paymentMethods.forEach((method, index) => {
      setters[index](method === paymentMethod);
    });
  };
  

  const handlePayment = () => {
    if (selectedPaymentMethod) {
      toast.success(`Payment method selected: ${selectedPaymentMethod}`);
      navigate("/success")
    } else {
      toast.error("Please select a payment method to proceed.")
    }
  };

  return (
    <div >
        <ToastContainer/>
        <h1 className="bg-blue-500 p-2 font-semibold text-lg text-white w-full rounded-lg">
          Payment
        </h1>
        <div className="flex flex-col gap-3 mt-4 ml-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="phonePay"
              value="Phone Pay"
              checked={selectedPaymentMethod === "Phone Pay"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="phonePay" className="font-medium">
              Phone Pay
            </label>
          </div>
          {phonepay ? (
            <div>
              <Phonepay/>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center">
            <input
              type="radio"
              id="paytm"
              value="Paytm"
              checked={selectedPaymentMethod === "Paytm"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="paytm" className="font-medium">
              Paytm
            </label>
          </div>
          {paytm ? (
            <div>
              <Phonepay/>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center">
            <input
              type="radio"
              id="card"
              value="Card"
              checked={selectedPaymentMethod === "Card"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="card" className="font-medium">
              Card
            </label>
          </div>
          {card ? (
            <div>
              <CreditCard/>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center">
            <input
              type="radio"
              id="cashOnDelivery"
              value="Cash on Delivery"
              checked={selectedPaymentMethod === "Cash on Delivery"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="cashOnDelivery" className="font-medium">
              Cash on Delivery
            </label>
          </div>
          {cash ? (
            <div className="ml-8">
              <h1>You have choosen the Cash On Delivery Method</h1>
              <h1>Please pay the amount of <span className="font-bold text-red-500">
                ₹{total}
                </span>
                <br/>While delivery of the product at your location
                </h1>
                
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={handlePayment}
          className="mt-4 bg-green-500 text-white p-2 rounded-lg font-semibold hover:bg-green-600"
        >
          Confirm Payment
        </button>
    </div>
  );
};

export default PaymentSection;
