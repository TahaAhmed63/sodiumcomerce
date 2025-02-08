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
import HomeSlide from '@/components/HomeSlide'
import sec5main from "./../assest/sec4main.webp"
import productimg1 from "./../assest/mainimg1.webp"
import productimg2 from "./../assest/sec1img2.webp"
import productimg3 from "./../assest/product2.webp"
import productimg4 from "./../assest/product3.webp"
import productimg5 from "./../assest/product4.webp"
import Trending from '@/components/Trending'
import QouteSection from '@/components/homeComponents/QouteSection'
import MainCollection from '@/components/homeComponents/MainCollection'
import FullWidthSec from '@/components/homeComponents/FullWidthSec'
import FeaturedCollection from '@/components/homeComponents/FeaturedCollection'
import Catagories from '@/components/homeComponents/Catagories'
// import productimg3 from "./../assest/sec1img2.webp"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
