import React from 'react'
import sec5main from "./../../assest/sec4main.webp"
import Image from 'next/image'
const FullWidthSec = () => {
  return (
    <section className=" bg-gray-50">
    <div className=" ">
      <div className="grid md:grid-cols-2  items-center">
        <div className='flex flex-col items-end px-3'>
          <h2 className="text-3xl font-bold mb-4">Loungewear</h2>
          <p className="text-gray-600 mb-8">Discover our comfortable and stylish loungewear collection.</p>
          <button className="bg-sky-600 text-white px-8 py-3 hover:bg-sky-700 transition-colors">
            SHOP NOW
          </button>
        </div>
        <div className="aspect-[4/3] relative">
          <Image
            src={sec5main}
            alt="Loungewear"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </div>
  </section>
  )
}

export default FullWidthSec