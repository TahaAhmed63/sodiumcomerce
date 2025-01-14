import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import main1 from './../assest/main1.webp';
import main2 from './../assest/main2.webp';
import main3 from './../assest/main3.webp';
import mainrelated1 from './../assest/mainrelated1.webp';
import mainrelated2 from './../assest/mainrelated2.webp';
import mainrelated3 from './../assest/mainrelated3.webp';

const Trending = () => {
  const products = [
    {
      id: 1,
      name: 'V Neck Blouse',
      price: '$84.00',
      rating: 5,
      productImage: main1,
      modelImage: mainrelated1,
    },
    {
      id: 2,
      name: 'Round Neck Blouse',
      price: '$92.00',
      rating: 4,
      productImage: main2,
      modelImage: mainrelated2,
    },
    {
      id: 3,
      name: 'Casual Blouse',
      price: '$95.00',
      rating: 3,
      productImage: main3,
      modelImage: mainrelated3,
    },
  ];

  const modelSwiperRef = useRef(null);
  const productSwiperRef = useRef(null);

  useEffect(() => {
    if (modelSwiperRef.current && productSwiperRef.current) {
      modelSwiperRef.current.controller.control = productSwiperRef.current;
      productSwiperRef.current.controller.control = modelSwiperRef.current;
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen min-h-screen relative overflow-hidden">
      {/* Left Swiper for Model Images */}
      <Swiper
        onSwiper={(swiper) => (modelSwiperRef.current = swiper)}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={1}
        modules={[Pagination, Scrollbar, A11y, Controller]}
        className="w-full h-full"
      >
        {products.map((product, index) => (
          <SwiperSlide
            key={product.id}
            className={`transition-slide ${index % 2 === 0 ? 'slide-from-bottom' : 'slide-from-top'}`}
          >
            <Image
              src={product?.modelImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Swiper for Product Details */}
      <Swiper
        onSwiper={(swiper) => (productSwiperRef.current = swiper)}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller, Autoplay]}
        autoplay={true}
        className="w-full h-full"
        pagination={{
          type: 'bullets',
          clickable: true,
          horizontalClass: 'pagination-horizontal',
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="text-center p-4">
              <Image src={product?.productImage} alt={product.name} className="mx-auto mb-4" />
              <h2 className="font-bold text-xl">{product.name}</h2>
              <div className="flex justify-center mb-2">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
                {Array.from({ length: 5 - product.rating }).map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <p className="text-lg font-bold">{product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling and Slide Animation Styling */}
      <style jsx global>{`
        .swiper-pagination.pagination-horizontal {
          bottom: 10px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .swiper-pagination.pagination-horizontal .swiper-pagination-bullet {
          background-color: #333;
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .swiper-pagination.pagination-horizontal .swiper-pagination-bullet-active {
          background-color: #000;
        }
        /* Slide Transition Animations */
        .transition-slide {
          transition: transform 0.8s ease;
        }
        .slide-from-bottom {
          transform: translateY(100%);
        }
        .swiper-slide-active.slide-from-bottom {
          transform: translateY(0);
        }
        .slide-from-top {
          transform: translateY(-100%);
        }
        .swiper-slide-active.slide-from-top {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Trending;
