import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function MainSwiper(props) {
    const {title, slides} = props;
    const [swiperInstance, setSwiperInstance] = useState({
    beginning: true,
    end: false,
    });
    const uniqeId = `swiper-${Math.random().toString(36).substr(2, 9)}`;
    

return (
    <section className="h-full mx-auto px-6 py-20">
      {/* Header and slide buttons */}
        <div className="flex justify-between">
        <h2 className="text-2xl f-cairo font-bold mb-4 ">{title}</h2>
        <div className="flex gap-2 mb-4">
            <button
            disabled={swiperInstance.beginning}
            className={`prev-${uniqeId} flex justify-center items-center transition-all duration-300 
            w-[38px] h-[38px] !rounded-[10px] bg-[#F1F1F1] text-[#222222]`}>
            <ChevronLeft />
            </button>
            <button
            disabled={swiperInstance.end}
            className={`next-${uniqeId} flex justify-center items-center  transition-all duration-300 
            w-[38px] h-[38px] !rounded-[10px] bg-[#F1F1F1] text-[#222222]`}>
            <ChevronRight />
            </button>
        </div>
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
        navigation={{ prevEl: `.prev-${uniqeId}`, nextEl: `.next-${uniqeId}` }}
        modules={[Navigation]}
        className="product-swipe p-3 "
        onSlideChange={(swiper) =>
            setSwiperInstance({
            beginning: swiper.isBeginning,
            end: swiper.isEnd,
            })
        }>
            {slides.map((content, ind) => (
                    <SwiperSlide key={ind}>
                        {content}
                    </SwiperSlide>))}

        </Swiper>
    </section>
    );
}
