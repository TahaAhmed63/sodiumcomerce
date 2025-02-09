import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '@/store/slice/productslice';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeaturedCollection = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProductData());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const publishedProducts = products?.products?.filter(
    (product) => product.status !== "draft"
  );

  return (
    <>
    
        <div className="row g-4">
          {publishedProducts?.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button className='btn btn-dark px-4 py-2'>View All</button>
        </div>
      
    </>
  );
};

export default FeaturedCollection;
