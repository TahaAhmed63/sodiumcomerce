import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className="bg-white border-t border-sky-600 py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">SHOP</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Sale
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">HELP</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Shipping
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">ABOUT</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-sky-600">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">NEWSLETTER</h3>
          <p className="text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-1 py-2 border border-gray-300 focus:outline-none focus:border-sky-600"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
            <ChevronRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer