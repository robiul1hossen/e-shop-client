"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Title from "./Title";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await axios.get("/reviews.json");
      setReviews(res.data);
      setLoading(false);
    };

    loadReviews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mb-12 max-w-6xl mx-auto">
      <div className="py-8 text-3xl text-center">
        <Title text1={"CUSTOMER"} text2={"REVIEWS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          scale: 0.75,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="review-card">
            {/* {console.log(review)} */}
            <div className="card-content">
              {/* Upper Section: Quote Icon & Rating */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl text-blue-200 font-serif">“</span>
                <div className="flex text-yellow-400 text-sm">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>

              {/* Middle Section: Review Text */}
              <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
                {review.text}
              </p>

              {/* Bottom Section: User Info */}
              <div className="flex items-center border-t pt-4">
                <div className="relative w-12 h-12 mr-3">
                  <Image
                    width={100}
                    height={100}
                    src={review.image}
                    alt={review.name}
                    className="rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 text-sm">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Verified Customer • {review.date}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
