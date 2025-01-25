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
import FeaturedCollection from '@/Components/homeComponents/FeaturedCollection'
import Catagories from '@/Components/homeComponents/Catagories'
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
   <FeaturedCollection/>



     <Catagories/>
   
      </main>

 </div>

  );
}
