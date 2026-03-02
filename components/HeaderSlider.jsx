import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Timeless Sophistication - Chanel N°5 Perfume is here!",
      offer: "Premium Fragrance Collection",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.chanel_n5_perfume,
    },
    {
      id: 2,
      title: "Australian Secrets - Natural Tea Tree Care for you!",
      offer: "Exclusive Skincare Deal",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.pilgrim_shampoo,
    },
    {
      id: 3,
      title: "Bold & Iconic - Your Perfect Retro Matte Lipstick!",
      offer: "Limited Edition Colors",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.retro_matte_lipstick,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-white dark:bg-slate-900 py-4 md:py-4 md:px-10 px-5 mt-4 rounded-xl min-w-full transition-colors border border-gray-100 dark:border-slate-800 shadow-sm"
          >
            <div className="md:pl-8 mt-8 md:mt-0">
              <p className="md:text-base text-primary font-medium pb-1 uppercase tracking-wider">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[44px] md:leading-[52px] text-2xl font-bold text-gray-900 dark:text-gray-100">
                {slide.title}
              </h1>
              <div className="flex items-center mt-5 md:mt-8 ">
                <button className="md:px-10 px-8 md:py-3 py-2 bg-primary hover:bg-primary-hover rounded-full text-white font-semibold text-base transition-colors shadow-lg">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2 font-medium text-gray-700 dark:text-gray-300 text-base">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1 transition dark:invert" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center md:justify-end">
              <Image
                className="md:w-[350px] w-60 object-contain"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-primary" : "bg-gray-500/30"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
