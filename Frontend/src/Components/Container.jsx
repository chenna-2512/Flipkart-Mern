import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const [items, setItems] = useState({}); 
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://flipkart-mern-1.onrender.com/postItems")
      .then(response => {
        const products = response?.data?.data;
        const categoryItems = {};

        for (let item of products) {
          let category = item.category;
          if (!categoryItems[category]) {
            categoryItems[category] = [];
          }
          categoryItems[category].push(item);
        }

        setItems(categoryItems);
      })
      .catch(error => {
        console.error("Error fetching items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-4 md:p-8">
      {loading ? (
        <div className="text-center text-lg font-semibold">
          Loading items... 🔄
        </div>
      ) : (
        Object.entries(items).map(([category, itemList]) => (
          <div 
            key={category} 
            className="flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 transform hover:scale-105"
            onClick={() => navigate(`category/${category}`, { state: { itemList } })}
          >
            <p className="text-center font-medium text-lg">{itemList[0]?.name}</p>
            {itemList[0]?.image && (
              <img 
                src={itemList[0].image} 
                alt={itemList[0].name}  
                className="w-40 h-52 md:w-60 md:h-72 lg:w-70 lg:h-80 rounded-lg border-3 border-red-500 hover:shadow-2xl hover:rounded-xl hover:border-green-400"
              />
            )}
            <h3 className="mt-3 font-semibold text-xl">{category}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Container;
