"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Title from "./Title";
import { motion } from "framer-motion";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products.json")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 max-w-6xl mx-auto">
      <div className="py-8 text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div className=" px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};

export default LatestProducts;
