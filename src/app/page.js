'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Navigation, Pagination } from 'swiper/modules'
import { Star} from 'lucide-react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomeSlide from '@/Components/HomeSlide'
import sec5main from "./../assest/sec4main.webp"
import productimg1 from "./../assest/mainimg1.webp"
import productimg2 from "./../assest/sec1img2.webp"
import productimg3 from "./../assest/product2.webp"
import productimg4 from "./../assest/product3.webp"
import productimg5 from "./../assest/product4.webp"
import Trending from '@/Components/Trending'
// import productimg3 from "./../assest/sec1img2.webp"

export default function Home() {
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
  if (!mounted) return null
  return (  
    <div className="min-h-screen bg-white">
   <main>

        {/* Hero Slider */}
        <section className="relative">
       <HomeSlide/>
        </section>

        {/* Quote Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <p className="text-xl italic text-gray-600">
              "Being perfectly well-dressed gives one a tranquility that no religion can bestow"
            </p>
          </div>
        </section>

        {/* Recommended Product */}
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

        {/* Denim Collection */}
        <section className="py-16">
          <div className=" mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">DENIM COLLECTION</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {denimCollection?.products.map((e, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] relative mb-4">
                    <Image
                      src={e?.image}
                      alt="Denim Product"
                      className="object-cover"
                      fill
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-2">{e?.name}</h3>
                  <div className="flex mb-2">
                    {[...Array(e?.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-sky-600 fill-sky-600" />
                    ))}
                  </div>
                  <p className="text-lg font-bold">{e?.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
<Trending/>
        {/* Loungewear */}
        <section className="py-16 bg-gray-50">
          <div className=" ">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className='flex flex-col items-end'>
                <h2 className="text-3xl font-bold mb-4">Loungewear</h2>
                <p className="text-gray-600 mb-8">Discover our comfortable and stylish loungewear collection.</p>
                <button className="bg-sky-600 text-white px-8 py-3 hover:bg-sky-700 transition-colors">
                  SHOP NOW
                </button>
              </div>
              <div className="aspect-[4/3] relative">
                <Image
                  src={sec5main}
                  alt="Loungewear"
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Yes Shop */}
        <section className="py-16">
          <div className=" ">
            <h2 className="text-2xl font-bold mb-8 text-center">THE Tea SHOP</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {denimCollection?.products.map((e, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] relative mb-4">
                    <Image
                      src={e?.image}
                      alt="Denim Product"
                      className="object-cover"
                      fill
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-2">{e?.name}</h3>
                  <div className="flex mb-2">
                    {[...Array(e?.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-sky-600 fill-sky-600" />
                    ))}
                  </div>
                  <p className="text-lg font-bold">{e?.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
   
      </main>

 </div>

  );
}
