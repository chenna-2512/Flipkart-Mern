import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.itemList || []; // Ensure itemList is an array
  const { head } = useParams();

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 cursor-pointer">
        {item.map((items) => (
          <div
            key={items.id || items.title}
            className="bg-white border-2 border-red-500 rounded-lg shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300"
            onClick={() => navigate(`/${items.title}`, { state: items })}
          >
            <img
              className="p-4 rounded-t-lg w-full h-100 object-cover"
              src={items.image}
              alt={items.title}
            />
            <div className="px-5 pb-5">
              <h3 className="font-semibold text-lg">{items.description}</h3>

              <div className="flex items-center mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xl sm:text-2xl font-bold text-gray-800 ml-2">
                  {items.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Category;
