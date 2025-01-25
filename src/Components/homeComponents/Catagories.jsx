"use-client"
import React, { useEffect, useState } from 'react'
import Heading from '@/Components/mainComponents/heading'
import { fetchCatagoiesData } from '@/store/slice/catagoriesSlice';
import { useDispatch, useSelector } from 'react-redux';

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
    {catagories?.map((cat)=>(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto px-4 py-8">
    
    <div className="flex items-center relative catagories-bg text-white">
        <div className='absolute inset-0 bg-black bg-opacity-40 opacity-100 flex items-center justify-center ' style={{ backgroundImage: `url(${cat?.image?.src})` }}>
            <h6 className='text-black text-sm font-medium bg-white  p-1.5 m-[10px_12px] w-[150px] text-center'>{cat?.name}</h6>
        </div>
    </div>
    
    </div> 
    ))}

    
    </>
  )
}

export default Catagories