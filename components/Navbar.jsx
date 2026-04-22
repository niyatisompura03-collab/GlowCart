"use client";
import React from "react";
import { assets, CartIcon , BagIcon, HomeIcon, BoxIcon} from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";


  const Navbar = () => {
  const { isSeller, router, search, setSearch, showSearch, setShowSearch } = useAppContext();
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <ul className="hidden md:flex items-center gap-4">
        <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
           <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
           <input 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             type="text" 
             placeholder="Search products..." 
             className="bg-transparent outline-none text-sm ml-2 w-32 focus:w-48 transition-all duration-300"
             onFocus={() => {
               if(pathname !== '/all-products'){
                 router.push('/all-products')
               }
             }}
           />
           {search && (
             <button onClick={() => setSearch('')} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           )}
        </div>
        {user ? (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push('/all-products')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image src={assets.user_icon} alt="user icon" />
                Account
              </button>
            </SignInButton>
          )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}

        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
           <Image className="w-3 h-3" src={assets.search_icon} alt="search icon" />
           <input 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             type="text" 
             placeholder="Search..." 
             className="bg-transparent outline-none text-xs ml-1 w-20 focus:w-28 transition-all duration-300"
             onFocus={() => {
               if(pathname !== '/all-products'){
                 router.push('/all-products')
               }
             }}
           />
           {search && (
             <button onClick={() => setSearch('')} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
           )}
        </div>

        {user ? (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push('/all-products')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>
              </UserButton.MenuItems>
            </UserButton>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
