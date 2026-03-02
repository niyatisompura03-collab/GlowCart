import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-1 w-full cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
        >
            <div className="cursor-pointer relative bg-gray-500/10 dark:bg-slate-800 rounded-lg w-full h-52 sm:h-64 flex items-center justify-center overflow-hidden transition-colors">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-110 transition duration-500 object-cover w-4/5 h-4/5 md:w-full md:h-full mix-blend-multiply dark:mix-blend-normal"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-700 transition">
                    <Image
                        className="h-3.5 w-3.5 dark:invert"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <div className="w-full mt-2">
                <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 truncate">{product.name}</p>
                <p className="w-full text-xs text-gray-500 dark:text-gray-400 max-sm:hidden truncate mt-0.5">{product.description}</p>

                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-3 w-3"
                                src={
                                    index < 4
                                        ? assets.star_icon
                                        : assets.star_dull_icon
                                }
                                alt="star_icon"
                            />
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400">(4.5)</p>
                </div>

                <div className="flex items-center justify-between w-full mt-2">
                    <p className="text-base font-bold text-primary">{currency}{product.offerPrice}</p>
                    <button className="hidden sm:block px-3 py-1 text-primary border border-primary/20 rounded-full text-[10px] font-medium hover:bg-primary hover:text-white transition-all duration-300">
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
