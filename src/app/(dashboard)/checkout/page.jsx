"use client";
import Title from "@/components/Title";
import axiosSecure from "@/lib/axiosSecure";
import { ArrowRight, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleCheckout = async (data) => {
    // console.log(data);
    data.shippingFee = 10;
    data.currency = "BDT";
    const res = await axiosSecure.post("/order", data);
    if (res?.data?.url) {
      window.location.replace(res?.data?.url);
    }
    console.log(res.data.url);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="mb-10 w-full">
        <div className="py-8 text-xs sm:text-sm md:text-3xl text-center">
          <Title text1={"CHECKOUT"} text2={"PAGE"} />
          {/* <p className=" w-full md:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            impedit perspiciatis vero dolor, nesciunt cumque vitae
          </p> */}
        </div>
        <div className="flex items-center justify-center w-full ">
          <form onSubmit={handleSubmit(handleCheckout)} className=" w-full ">
            <fieldset className="fieldset w-full">
              <div className="flex gap-5">
                <div>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    className="input outline-none w-full"
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      First Name is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input outline-none w-full"
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      Last Name is required
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input outline-none w-full"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    Email Address is required
                  </p>
                )}
              </div>
              <div>
                <label className="label">Street</label>
                <input
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Street"
                  {...register("street", { required: true })}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">Street is required</p>
                )}
              </div>
              <div className="flex gap-5">
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    className="input outline-none w-full"
                    placeholder="City"
                    {...register("city", { required: true })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">City is required</p>
                  )}
                </div>
                <div>
                  <label className="label">State</label>
                  <input
                    type="text"
                    className="input outline-none w-full"
                    placeholder="State"
                    {...register("state", { required: true })}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">State is required</p>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div>
                  <label className="label">ZIP Code</label>
                  <input
                    type="text"
                    className="input outline-none w-full"
                    placeholder="ZIP Code"
                    {...register("zip", { required: true })}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">ZIP Code is required</p>
                  )}
                </div>
                <div>
                  <label className="label">Country</label>
                  <input
                    type="text"
                    className="input outline-none w-full"
                    placeholder="Country"
                    {...register("country", { required: true })}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">Country is required</p>
                  )}
                </div>
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  className="input outline-none w-full"
                  placeholder="Phone Number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    Phone Number is required
                  </p>
                )}
              </div>
              <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-md active:scale-95 cursor-pointer mt-6">
                PLACE ORDER
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="w-full items-end">
        <div className="py-8 text-3xl text-center">
          <Title text1={"CART"} text2={"TOTALS"} />
          <div className="">
            {/* <div className="text-3xl ">
                <Title text1={"CART"} text2={"TOTALS"} />
              </div> */}
            <div className="">
              <h2 className="text-sm flex justify-between items-center text-gray-700">
                <span className="font-medium">Subtotal:</span> <span>${0}</span>
              </h2>
              <hr className=" text-gray-300 mt-1" />
              <h2 className="text-sm flex justify-between items-center text-gray-700 mt-6">
                <span className="font-medium">Shipping Fee:</span>{" "}
                <span>$10.00</span>
              </h2>
              <hr className=" text-gray-300 mt-1" />
              <h2 className="text-sm flex justify-between items-center text-gray-800 mt-6">
                <span className="font-bold">Total:</span> <span>${0 + 10}</span>
              </h2>
            </div>
            <Link href="/checkout">
              <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-md active:scale-95 cursor-pointer mt-6">
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
