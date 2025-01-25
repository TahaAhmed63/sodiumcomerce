'use client'

import Link from 'next/link'
import { useState } from 'react'
import { User, ShoppingBag, Facebook, Twitter, Instagram } from 'lucide-react'
import logo from './../assest/newsodium.png'
import { Search, Menu } from 'lucide-react'
import Image from 'next/image'
import {  X } from 'lucide-react'
const VimeoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.4077 0-2.5931-1.2837-3.5697-3.8753-.6498-2.3467-1.2995-4.7038-1.9492-7.0515-.7236-2.5835-1.4961-3.8846-2.3303-3.8846-.1813 0-.8188.3794-1.9054 1.1377l-1.1395-1.4434c1.1986-1.0398 2.3784-2.0797 3.567-3.1195 1.6095-1.3762 2.8192-2.0991 3.6295-2.1679 1.9075-.1837 3.0825 1.1143 3.5233 3.8928.4762 2.9776.8079 4.8262.9973 5.5429.5537 2.4876 1.1619 3.7314 1.8242 3.7314.5153 0 1.2906-.807 2.3242-2.4229 1.0307-1.6159 1.5826-2.8468 1.6558-3.6925.1476-1.3969-.4029-2.0987-1.6558-2.0987-.5912 0-1.1987.1341-1.8241.3991 1.2112-3.9081 3.5189-5.8045 6.9235-5.6869 2.5242.0828 3.7148 1.6886 3.5697 4.8366z" />
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    'HOME',
    'NEW  ARRIVALS',
    'BEST SELLING',
    'ABOUT',
  ]

  return (
    <div className="sticky top-0 z-50 bg-black text-dark">
      {/* Top Header */}
      <div className="flex items-center bg-dark text-white py-4  px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center text-sm font-medium"
          >
            <Menu className="h-5 w-5 mr-2" />
            MENU
          </button>
          <div className="hidden lg:flex items-center space-x-4">
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
        {/* <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={logo} width={300} height={40} alt="logo" className="w-auto h-20 md:h-20" />
        </Link> */}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
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

      {/* Categories Navigation */}
      <header className="w-full border-b bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
      <div class="grid grid-cols-12 gap-4">
          {/* Left Section */}
          <div class="col-span-4 flex items-center justify-end">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            
            {/* Search Icon */}
      

            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center  gap-8">
              <Link 
                href="/" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                HOME
              </Link>
              <Link 
                href="/new-arrivals" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                NEW ARRIVAL
              </Link>
            </nav>
          </div>
          <div class="col-span-4 flex items-center justify-center">
          {/* Center Logo */}
          <div className="img-wrap">
            <Link href="/" className="block">
              <Image
                src={logo}
                alt="Sodium Fashion Shop"
                width={240}
                height={120}
                className="h-20 w-auto lg:w-auto"
                priority
              />
            </Link>
          </div>
</div>
<div class="col-span-4 flex items-center justify-start" >
          {/* Right Section */}
          <div className="flex items-center gap-8">
            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link 
                href="/best-selling" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                BEST SELLING
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                ABOUT
              </Link>
            </nav>

            {/* User and Cart Icons */}
            <div className="flex items-center gap-4">
              <Link href="/account" className="p-2">
                <User className="h-5 w-5" />
              </Link>
              <Link href="/cart" className="p-2">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
</div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-24 bg-white z-50 px-4 py-6">
            <nav className="flex flex-col gap-6">
              <Link 
                href="/" 
                className="text-lg font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                href="/new-arrivals" 
                className="text-lg font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                NEW ARRIVAL
              </Link>
              <Link 
                href="/best-selling" 
                className="text-lg font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                BEST SELLING
              </Link>
              <Link 
                href="/about" 
                className="text-lg font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
    </div>
  )
}
