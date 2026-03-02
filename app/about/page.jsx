"use client"
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                        🌸 About Us
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Welcome to <span className="text-primary font-bold transition-all">GlowCart</span> – your trusted destination for premium skincare and beauty products from around the world.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                            At GlowCart, we believe that beauty is about confidence, self-care, and feeling your best every day. Our platform is designed to bring you a carefully curated collection of high-quality skincare and cosmetic products from both national and internationally recognized brands such as L'Oréal, Maybelline, MAC Cosmetics, The Ordinary, and Huda Beauty.
                        </p>
                        <div className="pt-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">We offer a wide range of products including:</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Skincare essentials",
                                    "Makeup products",
                                    "Beauty tools & accessories",
                                    "Trending collections"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center space-x-3 bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 transition-hover hover:shadow-md">
                                        <span className="text-primary text-xl">✨</span>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                         <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                         <Image 
                            src={assets.girl_with_headphone_image} 
                            alt="Beauty Community" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 mb-20">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Our mission is to make premium beauty products easily accessible through a seamless and secure online shopping experience. With features like easy product browsing, add-to-cart functionality, secure payment integration, and instant order confirmation via email and SMS, we ensure a smooth and reliable shopping journey for every customer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "100% Authentic", icon: "✔" },
                            { title: "Competitive Prices", icon: "✔" },
                            { title: "Fast Delivery", icon: "✔" },
                            { title: "Excellent Support", icon: "✔" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl text-center shadow-sm border border-gray-50 dark:border-gray-700">
                                <span className="text-primary text-2xl font-bold mb-4 block">{item.icon}</span>
                                <h4 className="text-gray-900 dark:text-gray-100 font-semibold">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium italic leading-relaxed">
                        "GlowCart is more than just an online store — it’s a beauty community that celebrates self-expression and empowers individuals to look and feel confident in their own skin."
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
