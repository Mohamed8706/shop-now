import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function MainSwiper(props) {
    const {title, slides} = props;
    

return (
    <section className="h-full mx-auto px-6 py-20">
      {/* Header */}
        <div className="flex justify-between">
        <h2 className="text-2xl f-cairo font-bold mb-4 ">{title}</h2>
        </div>
      {/* Swiper with data */}
        <Swiper
        spaceBetween={20}
        breakpoints={{
            320: {
            slidesPerView: 1,
            },
            700: {
            slidesPerView: 2,
            },
            930: {
            slidesPerView: 3,
            },
            1200: {
            slidesPerView: 4,
            },
        }}
        navigation={true}
        modules={[Navigation]}
        className="product-swipe p-3"
        >
            {slides?.map((content, ind) => (
                    <SwiperSlide key={ind}>
                        {content}
                    </SwiperSlide>))}

        </Swiper>
    </section>
    );
}
