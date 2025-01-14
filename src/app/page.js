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
import QouteSection from '@/Components/homeComponents/QouteSection'
import MainCollection from '@/Components/homeComponents/MainCollection'
import FullWidthSec from '@/Components/homeComponents/FullWidthSec'
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
     <QouteSection/>

        {/* Denim Collection */}
<MainCollection/>
<Trending/>
        {/* Loungewear */}
<FullWidthSec/>

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
