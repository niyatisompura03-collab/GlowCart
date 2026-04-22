"use client";
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const BrandProducts = ({ brandFilter, pageTitle }) => {
  const { products, router, search } = useAppContext()
  
  // Filter products where the product ID roughly correlates to the brand or brand name
  const filteredProducts = products.filter(product => {
    const matchesBrand = (product._id && product._id.includes(brandFilter)) || (product.name && product.name.toLowerCase().includes(brandFilter.toLowerCase()));
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  })

  return (
    <div className="flex flex-col items-center pt-8 px-4 sm:px-10 lg:px-20 bg-white min-h-screen transition-colors">
      <div className="w-full mb-6">
        <button 
          onClick={() => { router.push('/'); scrollTo(0,0); }}
          className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Image className="w-4 h-4 " src={assets.arrow_icon} alt="arrow_icon" style={{ transform: 'rotate(180deg)' }} />
          Home
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center w-full text-gray-900 mb-8">{pageTitle}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col items-start gap-6 mb-14 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">No products found for this category.</p>
        )}
      </div>
    </div>
  )
}

export default BrandProducts
