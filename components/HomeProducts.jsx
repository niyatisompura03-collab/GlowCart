import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products } = useAppContext()
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex flex-col items-center pt-14 bg-white transition-colors">
      <p className="text-2xl font-medium text-left w-full text-gray-900">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.slice(0, showAll ? products.length : 10).map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      {products.length > 10 && (
        <button onClick={() => setShowAll(!showAll)} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-gray-50 transition-colors cursor-pointer">
          {showAll ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default HomeProducts;
