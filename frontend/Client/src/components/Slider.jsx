import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination,Autoplay,Navigation } from 'swiper/modules';



export default function Slider() {
  const imgUrl=[
    'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.unsplash.com/photo-1680503397667-3877494708a1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1718524767488-10ee93e05e9c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]
  return (
    <>
    <style>
    {`
      .swiper-button-next, .swiper-button-prev {
        color: white !important;
      }
      .swiper-pagination-bullet {
        background-color: black !important;
        opacity: 0.5;
      }
      .swiper-pagination-bullet-active {
        background-color: white !important;
        opacity: 1;
      }
    `}
  </style>
      <Swiper
  spaceBetween={30}
  centeredSlides={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
    dynamicBullets: true,
  }}
  navigation={true}
  modules={[Autoplay, Pagination, Navigation]}
  className="mySwiper"
>
  {imgUrl.map((val, index) => (
    <SwiperSlide key={index}>
      <div
        className="h-[400px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${val})` }}
      >
        {/* Add content if needed */}
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </>
  );
}
