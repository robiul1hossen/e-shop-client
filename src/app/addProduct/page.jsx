"use client";
import Title from "@/components/Title";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleAddProduct = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="py-8 text-3xl text-center">
        <Title text1={"ADD"} text2={"PRODUCT"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div className="flex items-center justify-center ">
        <form onSubmit={handleSubmit(handleAddProduct)} className=" w-1/4">
          <fieldset className="fieldset w-full">
            <label className="label">Product Name</label>
            <input
              type="text"
              className="input outline-none w-full"
              placeholder="Product Name"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">Product Name is required</p>
            )}
            <label className="label">Price</label>
            <input
              type="number"
              className="input outline-none w-full"
              placeholder="Price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
            <label className="label">Image URL</label>
            <input
              type="text"
              className="input outline-none w-full"
              placeholder="Image URL"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image URL is required</p>
            )}
            <label className="label">Description</label>
            <input
              type="text"
              className="input outline-none w-full"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
            <button className="btn btn-neutral mt-4">ADD PRODUCT</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
