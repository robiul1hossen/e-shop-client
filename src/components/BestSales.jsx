"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Title from "./Title";

const BestSales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DOMAIN}/products`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="py-8 text-3xl text-center">
        <Title text1={"BEST"} text2={"SALES"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div className=" px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSales;
