import React, { useEffect, useState } from 'react'

import { ProductCard } from './ProductCard'
import productimg1 from "./../../assest/mainimg1.webp";
import productimg2 from "./../../assest/sec1img2.webp";
import productimg3 from "./../../assest/product2.webp";
import productimg4 from "./../../assest/product3.webp";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '@/store/slice/productslice';
import Heading from '../mainComponents/Heading';

const FeaturedCollection = () => {

  
      const dispatch = useDispatch();
      const products = useSelector((state) => state.products.data);
    
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true); // Start loading
          await dispatch(fetchProductData());
          setLoading(false); // End loading
        };
        fetchData();
      }, [dispatch]);
      const publishedProducts = products?.products?.filter(
        (product) => product.status !== "draft"
      );
  return (
    <>
  <Heading head={'Featured collection'} />
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {publishedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    <div className='flex justify-center w-100'>
    <button className='text-white text-sm  text-center  fz-29 px-5 p-1 bg-black my-3 py-2'>
        
view all
    </button>
    </div>
  </>
  )
}

export default FeaturedCollection