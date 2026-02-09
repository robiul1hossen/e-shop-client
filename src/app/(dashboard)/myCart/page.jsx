"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyCart = () => {
  const { user } = useAuth();

  const { data: carts = [], refetch } = useQuery({
    queryKey: ["cart-product", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-cart?email=${user?.email}`);
      return res.data;
    },
  });
  const totalPrice = carts.reduce((total, item) => {
    return total + item?.price * item.quantity;
  }, 0);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/cart/${id}`);
        refetch();
        toast.success("Product Deleted");
      }
    });

    refetch();
  };
  return (
    <div className="mb-25">
      <div className="py-8 text-3xl text-center">
        <Title text1={"MY"} text2={"CART"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, i) => (
                <tr key={cart?._id}>
                  <th>{i + 1}</th>
                  <td>
                    <Image
                      width={40}
                      height={40}
                      src={cart?.image}
                      alt={cart?.name}
                    />
                  </td>
                  <td>{cart?.name}</td>
                  <td>{cart.size}</td>
                  <td>{cart.quantity}</td>
                  <td>${cart?.price * cart?.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(cart._id)}
                      className="btn btn-xs">
                      {" "}
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-12">
            <div className="col-span-7"></div>
            <div className="col-span-5">
              <div className="text-3xl ">
                <Title text1={"CART"} text2={"TOTALS"} />
              </div>
              <div className="">
                <h2 className="text-sm flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal:</span>{" "}
                  <span>${totalPrice}</span>
                </h2>
                <hr className=" text-gray-300 mt-1" />
                <h2 className="text-sm flex justify-between items-center text-gray-700 mt-6">
                  <span className="font-medium">Shipping Fee:</span>{" "}
                  <span>$10.00</span>
                </h2>
                <hr className=" text-gray-300 mt-1" />
                <h2 className="text-sm flex justify-between items-center text-gray-800 mt-6">
                  <span className="font-bold">Total:</span>{" "}
                  <span>${totalPrice + 10}</span>
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
    </div>
  );
};

export default MyCart;
