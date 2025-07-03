"use client"

import React, { useEffect } from 'react';
import './globals.css';

import { CarouselOrientation } from '@/components/CarouselOrientation';
import Image from 'next/image';
import OurServices from '@/components/OurServices';

export default function Home() {
  const featureImages = [
    { image: "/20Lakh.png", heading: "20 Lakh+ Customers", description: "Happy Customers" },
    { image: "/BIS_Hallmark_2.avif", heading: 'BIS Hallmark', description: "Certified Gold" },
    { image: "/15DayDelivery.png", heading: "15 Day Delivery", description: "Delivery within 15 days" },
  ];

  const DemoCategoryImages = [
    { img: "/DemoCategoryImages/pendant.jpg", title: "Pendant", description: "Add this to your style Roaster" },
    { img: "/DemoCategoryImages/ring.jpg", title: "Ring", description: "Unique and stylish rings" },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-[fadeInUp_0.6s_ease-out_forwards]');
      }, index * 150); // stagger effect
    });
  }, []);

  return (
    <div>
      <CarouselOrientation />

      {/* Features Section */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {featureImages.map((feature, index) => (
            <div
              key={index}
              className="fade-in-up flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Image
                src={feature.image}
                alt={feature.heading}
                width={80}
                height={80}
                className="mb-4 rounded-2xl"
              />
              <h2 className="text-lg font-semibold text-gray-800">{feature.heading}</h2>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className='bg-gray-50 py-8 px-4'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6'>
          {DemoCategoryImages.map((feature, index) => (
            <div
              key={index}
              className='fade-in-up relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300'
            >
              <Image
                src={feature.img}
                alt={feature.title}
                width={800}
                height={800}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-white p-4 transition-opacity duration-300 hover:bg-black/50'>
                <h1 className='text-xl font-bold'>{feature.title}</h1>
                <p className='text-sm mt-2'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <OurServices/>
      </div>
    </div>
  );
}
