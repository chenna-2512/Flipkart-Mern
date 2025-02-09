// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AutoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/6a0b08a518b223cc.png?q=90",
    "https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/b534ac69003a5693.jpg?q=90",
    "https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/21c72584989b09a9.jpg?q=90",
    "https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/a19748ac5ccc2021.jpg?q=90",
    "https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/c928b14a5cddaf18.jpg?q=90",
  ];

  return (
    <div style={{ width: "100%", margin: "0 auto", padding: "2rem" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slider ${index + 1}`}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoSlider;
