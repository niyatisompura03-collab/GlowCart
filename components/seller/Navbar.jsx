import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { usePathname } from 'next/navigation'

const Navbar = () => {

  const { isSeller, router } = useAppContext()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b bg-white transition-colors'>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Menu"
          >
            <Image className="w-6 h-6" src={assets.menu_icon} alt="menu_icon" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-12 left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col p-2 z-50 text-gray-700">
              <button
                onClick={() => { router.push('/'); setIsMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left border-b border-gray-100 mb-1 ${pathname === '/' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
              >
                 <svg className={`w-5 h-5 ${pathname === '/' ? 'text-primary' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </button>
              
              {isSeller && (
                <button
                  onClick={() => { router.push('/seller'); setIsMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${pathname.startsWith('/seller') ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-5 h-5 ${pathname.startsWith('/seller') ? 'text-primary' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Seller Dashboard
                </button>
              )}
              
              <button
                onClick={() => { router.push('/account'); setIsMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${pathname === '/account' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
              >
                <svg className={`w-5 h-5 ${pathname === '/account' ? 'text-primary' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </button>
              
              <button
                onClick={() => { router.push('/login'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
        <Image onClick={() => router.push('/')} className='w-40 lg:w-56 cursor-pointer' src={assets.logo} alt="" />
      </div>
    </div>
  )
}

export default Navbar
