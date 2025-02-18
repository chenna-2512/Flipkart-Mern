import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {

    const before = localStorage.getItem("before");
    const toItems = localStorage.getItem("totalItems");
    const perce = localStorage.getItem("delivery");
    const total = localStorage.getItem("total");

    const navigate = useNavigate();

  const goToOrders = () => {
    navigate("/orders")
  }
  const goToCheckout = () => {
      if(total>0){
        navigate("/payment")
      }else{
        alert("Please add items to the Cart")
      }
  }
  const goToAddress = () => {
    navigate("/address");
  };

  return (
    <div>
      <div className="text-lg font-semibold space-y-2">
        <p className="flex justify-between">
        <span>Total Amount:</span> ₹{before}
        </p>
        <p className="flex justify-between">
        <span>Total Items:</span> {toItems}
        </p>
        <p className="flex justify-between">
        <span>Delivery Charges:</span> ₹{perce}
        </p>
        <hr className="border-gray-300 my-2" />
        <p className="flex justify-between text-xl font-bold">
        <span>Grand Total:</span> ₹{total}
        </p>
    </div>
    <div className="flex gap-2">
        <button className="w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={goToAddress}>
        Fill Your Address
        </button>
        <button className="w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={goToCheckout}>
        Place Order
        </button>
    </div>
    <button className="w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={goToOrders}>
        Your Orders
    </button>
    </div>
  )
}

export default OrderSummary
