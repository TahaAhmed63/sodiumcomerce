import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import productimg1 from "./../../assest/mainimg1.webp";
import productimg2 from "./../../assest/sec1img2.webp";
import productimg3 from "./../../assest/product2.webp";
import productimg4 from "./../../assest/product3.webp";
import { Star } from 'lucide-react';
import Image from 'next/image';

const MainCollection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const denimCollection = {
    title: "DENIM COLLECTION",
    products: [
      { id: 1, name: "Denim Product 1", image: productimg1, price: 99.99, rating: 5 },
      { id: 2, name: "Denim Product 2", image: productimg2, price: 99.99, rating: 5 },
      { id: 3, name: "Denim Product 3", image: productimg3, price: 99.99, rating: 5 },
      { id: 4, name: "Denim Product 4", image: productimg4, price: 99.99, rating: 5 },
    ],
  };

  return (
    <section className="pb-16">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">{denimCollection.title}</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}

          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {denimCollection?.products.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="group cursor-pointer">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainCollection;
