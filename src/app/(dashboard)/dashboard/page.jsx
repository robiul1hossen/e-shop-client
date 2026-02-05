"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { ShoppingBag, ShoppingCart, StarHalf, Users } from "lucide-react";

const OverView = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="py-8 text-3xl text-center">
        <Title text1={"QUICK"} text2={"OVERVIEW"} />
        {/* <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p> */}
      </div>
      <div className="flex flex-wrap gap-10">
        {/* Users Data */}
        <div className="w-64 h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl p-6 transition-all hover:scale-105 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <Users className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Total Users
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">500</p>
              <span className="text-xs text-emerald-200 font-medium">+12%</span>
            </div>
          </div>
        </div>
        {/* Cart Data */}
        <div className="w-64 h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl p-6 transition-all hover:scale-105 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Abandoned Carts
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">40</p>
              <span className="text-xs text-emerald-200 font-medium">+23%</span>
            </div>
          </div>
        </div>
        {/* Reviews Data */}
        <div className="w-64 h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl p-6 transition-all hover:scale-105 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <StarHalf className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Reviews & Feedback
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">178</p>
              <span className="text-xs text-emerald-200 font-medium">+37%</span>
            </div>
          </div>
        </div>
        {/* Reviews Data */}
        <div className="w-64 h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl p-6 transition-all hover:scale-105 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Order Management
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">120</p>
              <span className="text-xs text-emerald-200 font-medium">+23%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
