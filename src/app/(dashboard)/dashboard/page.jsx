"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

const OverView = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="py-8 text-3xl text-center">
        <Title text1={"QUICK"} text2={"OVERVIEW"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <h2>this is overview page {user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};

export default OverView;
