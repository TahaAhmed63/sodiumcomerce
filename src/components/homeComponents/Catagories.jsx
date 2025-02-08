"use-client"
import React, { useEffect, useState } from 'react'

import { fetchCatagoiesData } from '@/store/slice/catagoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../mainComponents/Heading';

const Catagories = () => {
    const dispatch = useDispatch();
    const catagories = useSelector((state) => state.catagories.data);
  
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // Start loading
        await dispatch(fetchCatagoiesData());
        setLoading(false); // End loading
      };
      fetchData();
    }, [dispatch]);
    console.log(catagories,"catagories")
  return (
    <>
    <Heading head={'Catagories'}/>
    <div   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto px-4 py-8 ">

    {catagories?.map((cat,i)=>(
    
    <div  key={i} className="flex mx-2 items-center relative catagories-bg text-white  mb-2">
        <div className='absolute inset-0 bg-black bg-opacity-40 opacity-100 flex items-center justify-center ' style={{ backgroundImage: `url(${cat?.image?.src})`,backgroundSize:'cover' }}>
            <h6 className='text-black text-sm font-medium bg-white  p-1.5 m-[10px_12px] w-[150px] text-center'>{cat?.name}</h6>
        </div>
    </div>            


    ))}
    </div> 
    
    </>
  )
}

export default Catagories