import React, { useEffect, useState } from 'react'
import productimg1 from "./../../assest/mainimg1.webp"
import productimg2 from "./../../assest/sec1img2.webp"
import productimg3 from "./../../assest/product2.webp"
import productimg4 from "./../../assest/product3.webp"
import productimg5 from "./../../assest/product4.webp"
import { Star } from 'lucide-react'
import Image from 'next/image'
const QouteSection = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])
    const denimCollection = {
      title: "DENIM COLLECTION",
      products: [
        {
          id: 1,
          name: "Denim Product 1",
          image: productimg1, // Replace with actual image path or variable
          price: 99.99,
          rating: 5, // Assume all products have 5 stars; adjust if needed
        },
        {
          id: 2,
          name: "Denim Product 2",
          image: productimg2,
          price: 99.99,
          rating: 5,
        },
        {
          id: 3,
          name: "Denim Product 3",
          image: productimg3,
          price: 99.99,
          rating: 5,
        },
        {
          id: 4,
          name: "Denim Product 4",
          image: productimg4,
          price: 99.99,
          rating: 5,
        },
      ],
    };
  return (
    <>
    <section className="py-16 text-center">
    <div className="container mx-auto px-4">
      <p className="text-xl italic text-gray-600">
        "Being perfectly well-dressed gives one a tranquility that no religion can bestow"
      </p>
    </div>
  </section>


  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">RECOMMENDED FOR YOU</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] relative">
          <Image
            src={productimg1}
            alt="Style Guide"
            className="object-cover"
            fill
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="max-w-sm text-center">
            <Image
              src={productimg2}
              alt="Mickey Mouse T-Shirt"
              width={300}
              height={300}
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-medium mb-2">Mickey Mouse T-Shirt</h3>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-sky-600 fill-sky-600" />
              ))}
            </div>
            <p className="text-xl font-bold">$29.99</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default QouteSection