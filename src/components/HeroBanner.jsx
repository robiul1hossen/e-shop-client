"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2026",
    subtitle: "Breathable fabrics and vibrant colors for the season.",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
    cta: "Shop Women",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    subtitle: "Defined by comfort, inspired by the city.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
    cta: "Explore Style",
  },
];

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[65vh]  overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full">
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}>
              {/* Dark Overlay for contrast */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content Container */}
              <div className="relative h-full container mx-auto px-8 flex flex-col justify-center items-start text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}>
                  <div className="badge badge-secondary mb-4 rounded-none px-4">
                    New Season
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-md font-light text-gray-100">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {/* DaisyUI Button with Lucide Icon */}
                    <button className="btn btn-primary btn-lg rounded-none group">
                      {slide.cta}
                      <ShoppingBag className="ml-2 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <button className="btn btn-ghost btn-lg rounded-none border-white text-white hover:bg-white hover:text-black">
                      View Collection
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tailwind/Swiper Customization */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 4px;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
}
