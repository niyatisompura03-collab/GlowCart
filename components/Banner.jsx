import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center py-20 md:py-32 bg-[#F6F1F1] dark:bg-slate-900 my-16 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl group">

      {/* Background Image with Hover Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-1000"
          src={assets.rare_beauty_banner}
          alt="Rare Beauty Banner"
          priority
        />
        {/* Soft Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 dark:from-slate-900/60 dark:to-slate-900/60"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 px-6 md:px-0">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-6xl font-bold max-w-[600px] text-gray-700 dark:text-gray-100 tracking-tight leading-tight drop-shadow-sm">
            Glow with <span className="text-primary italic">Confidence</span>
          </h2>
          <p className="max-w-[450px] text-lg md:text-xl font-medium text-gray-800 dark:text-gray-300 drop-shadow-sm">
            Discover premium skincare and makeup essentials <br className="hidden md:block" /> curated for your natural radiance.
          </p>
        </div>

        <button className="group flex items-center justify-center gap-3 px-14 py-4 bg-primary hover:bg-primary/95 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all active:scale-95">
          Shop the Collection
          <Image className="group-hover:translate-x-2 transition-transform" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
