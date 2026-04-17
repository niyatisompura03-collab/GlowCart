import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount , getToken, user, cartItems, setCartItems} = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      
      const token = await getToken()
      const {data} = await axios.get('/api/user/get-address',
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      )
      if(data.success)
      {
        setUserAddresses(data.addresses)
        if(data.addresses.length > 0)
        {
          setSelectedAddress(data.addresses[0])
        }
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {

  }

  useEffect(() => {
    if(user){
      fetchUserAddresses();
    } 
  }, [user])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 dark:bg-slate-900/50 p-5 rounded-lg transition-colors">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 dark:border-gray-800 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 dark:text-gray-400 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border dark:border-gray-800">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white dark:bg-slate-950 text-gray-700 dark:text-gray-200 focus:outline-none transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white dark:bg-slate-950 border dark:border-gray-800 shadow-md mt-1 z-10 py-1.5 transition-colors">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 dark:hover:bg-gray-800 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 dark:text-gray-400 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 dark:text-gray-300 bg-transparent border dark:border-gray-800"
            />
            <button className="bg-primary text-white px-9 py-2 hover:bg-primary-hover transition-colors">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 dark:border-gray-800 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600 dark:text-gray-400">Items {getCartCount()}</p>
            <p className="text-gray-800 dark:text-gray-200">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 dark:text-gray-400">Shipping Fee</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 dark:text-gray-400">Tax (2%)</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t dark:border-gray-800 pt-3">
            <p className="dark:text-gray-100">Total</p>
            <p className="dark:text-gray-100">{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full bg-primary text-white py-3 mt-5 hover:bg-primary-hover transition-colors">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
