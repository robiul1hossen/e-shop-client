"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const MyCart = () => {
  const { user } = useAuth();

  const { data: carts = [] } = useQuery({
    queryKey: ["cart-product", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-cart?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(carts);
  return (
    <div>
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
                      src={cart.productData?.image}
                      alt={cart.productData.name}
                    />
                  </td>
                  <td>{cart.productData.name}</td>
                  <td>{cart.size}</td>
                  <td>{cart.quantity}</td>
                  <td>${cart.productData.price * cart.quantity}</td>
                  <td>
                    <button className="btn btn-xs">
                      {" "}
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
