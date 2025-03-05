const Bottom = () => {
  return (
    <div className="bg-white border-b border-gray-300 p-2">
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-15 overflow-x-auto whitespace-nowrap">
        {["Electronics", "TVs & Appliances", "Men", "Women", "Baby & Kids", "Home & Furniture"].map((category, index) => (
          <button key={index} className="flex items-center gap-1 text-sm md:text-base font-semibold hover:underline">
            {category}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Bottom;
