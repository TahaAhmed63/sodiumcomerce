'use client'

import Link from 'next/link'
import { useState } from 'react'
import { User, ShoppingBag, Facebook, Twitter, Instagram } from 'lucide-react'
import logo from "./../assest/image (95).webp"
import {  Search, Menu } from 'lucide-react'
import Image from 'next/image'
const VimeoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.4077 0-2.5931-1.2837-3.5697-3.8753-.6498-2.3467-1.2995-4.7038-1.9492-7.0515-.7236-2.5835-1.4961-3.8846-2.3303-3.8846-.1813 0-.8188.3794-1.9054 1.1377l-1.1395-1.4434c1.1986-1.0398 2.3784-2.0797 3.567-3.1195 1.6095-1.3762 2.8192-2.0991 3.6295-2.1679 1.9075-.1837 3.0825 1.1143 3.5233 3.8928.4762 2.9776.8079 4.8262.9973 5.5429.5537 2.4876 1.1619 3.7314 1.8242 3.7314.5153 0 1.2906-.8070 2.3242-2.4229 1.0307-1.6159 1.5826-2.8468 1.6558-3.6925.1476-1.3969-.4029-2.0987-1.6558-2.0987-.5912 0-1.1987.1341-1.8241.3991 1.2112-3.9081 3.5189-5.8045 6.9235-5.6869 2.5242.0828 3.7148 1.6886 3.5697 4.8366z" />
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    'DRESSES',
    'SHOES',
    'DENIM JACKET',
    'WINTER COATS',
    'CARDIGANS',
    'BLAZERS',
    'SWEATER DRESSES',
    'DENIM SHORTS',
    'T-SHIRTS',
    'ACCESSORIES'
  ]

  return (
    <header className="sticky top-0 z-50 bg-black text-dark">
   
        {/* Top Header */}
        <div className="flex relative items-center bg-white  h-16 px-4">
     
          {/* Left Section */}
          <div className="flex flex-1 items-center space-x-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center text-sm font-medium"
            >
              <Menu className="h-5 w-5 mr-2" />
              MENU
            </button>
            <div className="flex items-center justify-center space-x-5 lg:space-x-7 md:space-x-6 px-4 h-12 text-sm">
              <Link href="#" className="hover:text-gray-300">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <VimeoIcon />
              </Link>
            </div>
          </div>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2  -translate-x-1/2 -translate-y-1">
       <Image src={logo} width="200px" height="auto" alt='logo'/>
          </Link>

          {/* Right Section */}
          <div className="flex items-center  space-x-5 lg:space-x-7 md:space-x-6 px-4 h-12 text-sm">
            <button className="hover:text-gray-300">
              <Search className="h-5 w-5" />
            </button>
            <button className="hover:text-gray-300">
              <User className="h-5 w-5" />
            </button>
            <button className="relative hover:text-gray-300">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-yellow-400 text-black text-xs rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
        <div className="container mx-auto">
        {/* Categories Navigation */}
        <nav className="hidden md:block border-t border-gray-800 text-white">
          <ul className="flex items-center justify-center space-x-8 px-4 h-12 text-sm">
            {categories.map((category) => (
              <li key={category}>
                <Link 
                  href="#" 
                  className="hover:text-gray-300 whitespace-nowrap"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black border-t border-gray-800">
            <nav className="py-4">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link 
                      href="#" 
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}