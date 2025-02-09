'use client'
import React from 'react'
import Image from 'next/image'
import slideimg1 from "./../assest/slide1.png"
// import slideimg2 from "./../assest/slide2.jpg"
// import slideimg3 from "./../assest/slide3.jpg"
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeSlide = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        <SwiperSlide className='h-full'>
          <div className="relative md:h-[400px] h-[118px]">
            <Image
              src={slideimg1}
              alt="Daisy Dress"
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">DAISY DRESS</h1>
                <button className="bg-white text-black px-8 py-3 rounded-none hover:bg-sky-600 hover:text-white transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div> */}
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <div className="relative h-full">
            <Image
              src={slideimg2}
              alt="Daisy Dress"
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">DAISY DRESS</h1>
                <button className="bg-white text-black px-8 py-3 rounded-none hover:bg-sky-600 hover:text-white transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full">
            <Image
              src={slideimg3}
              alt="Daisy Dress"
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">DAISY DRESS</h1>
                <button className="bg-white text-black px-8 py-3 rounded-none hover:bg-sky-600 hover:text-white transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </section>
  )
}

export default HomeSlide
