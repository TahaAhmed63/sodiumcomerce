'use client'

import { useState } from 'react'
import Link from 'next/link'



export function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(product?.images[0]?.src)
  const hasSalePrice =
  product?.sale_price !== "" ||
  product?.variations?.some((variation) => variation?.sale_price !== "");

  return (
    <div className="group relative">
      {/* Sale Badge */}
      <div className="absolute top-4 left-4 z-10">
       {  !hasSalePrice && (
    <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium">
      Sale
    </span>
  )}
      </div>

      {/* Product Image with Hover Effect */}
      <Link href={`/Collection/${product.slug}`}>
        <div 
          className="relative w-full aspect-[3/4] bg-cover bg-center transition-all duration-300 ease-in-out"
          style={{ backgroundImage: `url(${currentImage})` }}
          onMouseEnter={() => {
            if (product.images?.[0]) {
              setCurrentImage(product.images[1] ? product.images[1].src : currentImage)
            }
          }}
          onMouseLeave={() => setCurrentImage(product.images[0].src)}
        >
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end  justify-center">
            <span className="text-white text-sm font-medium bg-black p-1.5 m-[10px_12px] w-full text-center">
              Quick view
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-md text-center font-medium text-gray-900">
          <Link href={`/Collection/${product.slug}`}>
            {product?.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-center">
          <span className="text-sm font-medium text-gray-900 text-center flex justify-center"  dangerouslySetInnerHTML={{ __html: product.price_html }} />
         
          {/* <span className="text-sm text-gray-500 line-through">
            Rs.{product.originalPrice.toLocaleString()}
          </span>
          <span className="text-sm text-red-500">
            Save Rs.{product.savings.toLocaleString()}
          </span> */}
        </div>
      </div>
    </div>
  )
}

