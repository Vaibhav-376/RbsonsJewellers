"use client";

import Image from 'next/image';
import React from 'react'

const OurServices = () => {

    const ourService = [
        {image:"/ourservices/deliveryImage.svg", title:"Complimentary Shipping", description:"We offer complimentary shipping and returns on all Orders"},
        {image:"/ourservices/customerSupport.svg", title:"Rbsons at your Service", description:"Our client care experts are always available to help you"},
        {image:"/ourservices/box.svg",title:"The Iconic Blue Box", description:"Your RbSons purchases comes wrapped in out BlueBox"}
    ]

  return (
    <div className='py-10'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 '>
            {ourService.map((item,index)=>(
                <div key={index} className='flex items-center flex-col gap-2 fade-in-up overflow-hidden transform-all duration-300 border-2 bg-white rounded-xl p-4 shadow-2xl hover:scale-105'>
                    <Image src={item.image} alt={item.title} width={100} height={100} className='w-16 h-16 object-cover '/>
                    <h1 className='font-bold text-xl text-[#2D1154]'>{item.title}</h1>
                    <p className='text-center text-lg'>{item.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default OurServices