const Bcomp = () => {
  const arr = [
    "https://rukminim1.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100",
    "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
    "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100",
    "https://rukminim1.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100",
    "https://rukminim1.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100"
  ];

  const arr_name = ["Kilos", "Mobiles", "Fashion", "Electronics", "Home & Furniture"];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4 border border-gray-300">
      {arr.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={item} alt={arr_name[index]} className="w-16 sm:w-20 md:w-24 lg:w-28"/>
          <h6 className="font-semibold text-sm sm:text-base">{arr_name[index]}</h6>
        </div>
      ))}
    </div>
  );
};

export default Bcomp;
