import { useState, useEffect } from 'react'
import axios from 'axios';

const CartStructure = () => {

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
            .get("https://flipkart-mern-1.onrender.com/getcartitems")
            .then((response) => {
                const cartdata = response?.data?.data || [];
                const userCart = cartdata.filter(item => item.id === storedid);
                updateTotal(userCart);
                setCart(userCart);
            })
            .catch((error) => {
                console.log("Error getting data : ", error);
            });
        }
    }, [isLogged]);

    const deleteItem = async (index) => {
        const itemToRemove = cart[index];
        try {
            const response = await axios.delete(
                `https://flipkart-mern-1.onrender.com/deletedata/${itemToRemove._id}`
            );
            if (response.status === 200) {
                const updatedItems = cart.filter((_, i) => i !== index);
                setCart(updatedItems);
                updateTotal(updatedItems);
            } else {
                console.error("Failed to remove item. Response:", response);
            }
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };
    
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
            if (amount > 0 && amount <= 1000) {
            let price = (50 / 100) * 100;
            let totalAmount = amount + price;
            setTotal(totalAmount);
            setPercent(price);
            } else {
            setTotal(0);
            setPercent(0);
            }
        }
    };

    localStorage.setItem("total",total);
    localStorage.setItem("delivery",perce);
    localStorage.setItem("before",before);
    localStorage.setItem("totalItems",toItems);
    localStorage.setItem("cartlength", cart.length);
    
  return (
    <div>
      {cart.map((item, index) => (
        <div
        key={index}
        className="p-4 bg-white rounded-lg shadow-md flex items-center mb-[1rem]"
        >
        <div className="w-24 h-24 flex-shrink-0">
            <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
            />
        </div>
        <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">
                {item.title}
            </h3>
            <button
                onClick={() => deleteItem(index)}
                className="text-red-500 hover:text-red-700"
            >
                ✖
            </button>
            </div>
            <div className="flex items-center mt-3">
            <button
                onClick={() => handleDecrement(index)}
                className="px-3 py-1 bg-gray-300 rounded-lg"
            >
                -
            </button>
            <span className="mx-3 text-lg">{item.quantity}</span>
            <button
                onClick={() => handleIncrement(index)}
                className="px-3 py-1 bg-gray-300 rounded-lg"
            >
                +
            </button>
            </div>
            <p className="mt-2 text-lg font-semibold text-gray-900">
            ₹{item.price}
            </p>
        </div>
        </div>
    ))}
    </div>
  )
}

export default CartStructure
