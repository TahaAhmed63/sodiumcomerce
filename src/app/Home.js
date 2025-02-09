"use client";

import { useEffect, useState } from "react";
import HomeSlide from "@/components/HomeSlide";
import MiniCart from "@/Components/mincart/MiniCart";
import FeaturedCollection from "@/components/homeComponents/FeaturedCollection";
import Catagories from "@/components/homeComponents/Catagories";
import WPBakeryRenderer from "@/Components/wpBakeryComponents/WpBakeryRender";

export default function Home({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
console.log(data,"data")
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Slider */}
        <section className="relative">
          <HomeSlide />
        </section>

        {/* Render WPBakery Content */}
        {data?.parsed_wp_bakery_content && (
          <div className="container">
            <WPBakeryRenderer content={data.parsed_wp_bakery_content} />
          </div>
        )}

        {/* Other Sections */}
        <MiniCart />
        {/* <FeaturedCollection /> */}
        {/* <Catagories /> */}
      </main>
    </div>
  );
}
