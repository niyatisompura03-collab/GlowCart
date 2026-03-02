import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.laneige_banner,
    title: "Hydration Specialists",
    description: "Discover Laneige's Korean skincare for ultimate moisture and glow.",
  },
  {
    id: 2,
    image: assets.lador_banner,
    title: "Nutritive Hair Care",
    description: "Rejuvenate your locks with Lador's premium hair oil & treatments.",
  },
  {
    id: 3,
    image: assets.tir_tir_banner,
    title: "Flawless Foundation",
    description: "Achieve the perfect base with TirTir's long-lasting foundation.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Featured Korean Brand Collections</h2>
        <div className="w-60 h-1 bg-primary mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group overflow-hidden rounded-2xl shadow-lg bg-gray-100 dark:bg-slate-800">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Permanent Overlay with Gradient for Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
              <div className="space-y-3">
                <p className="font-bold text-2xl lg:text-3xl tracking-wide drop-shadow-md">
                  {title}
                </p>
                <p className="text-sm lg:text-base text-gray-200 line-clamp-2 leading-relaxed max-w-xs transition-colors group-hover:text-white">
                  {description}
                </p>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all active:scale-95">
                  Shop Now <Image className="h-3 w-3 brightness-200" src={assets.redirect_icon} alt="Redirect Icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
