import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const [items, setItems] = useState({}); // Store categorized items as state

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/postItems")
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
      });
  }, []);

  return (
    <div className="flex gap-10 justify-center items-center cursor-pointer p-8">
      {Object.entries(items).map(([category, itemList]) => (
        <div key={category} className="flex flex-col justify-center items-center" onClick={()=> navigate(`category/${category}`,{state : {itemList}})}>
          <p>{itemList[0]?.name}</p>
          {itemList[0]?.image && <img src={itemList[0].image} alt={itemList[0].name}  className="w-70 h-80 rounded-lg border-3 border-red-500 hover:shadow-2xl hover:rounded-xl hover:border-green-400"/>}
          <h3 className="mt-4 font-semibold text-xl">{category}</h3>
        </div>
      ))}
    </div>
  );
};

export default Container;
