"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const MyOrder = () => {
  const { user } = useAuth();
  const { data: myOrder } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myOrders/${user?.email}`);
      return res.data;
    },
  });
  let completedOrder;
  if (myOrder) {
    completedOrder = myOrder[0];
  }

  console.log(completedOrder);

  return (
    <div>
      <div>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Paid At</th>
              <th>Track Your Product</th>
            </tr>
          </thead>
          <tbody>
            {completedOrder?.cartOrderData?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>
                  <Image
                    width={40}
                    height={40}
                    src={order?.image}
                    alt={order?.name}
                  />
                </td>
                <td></td>
                <td>{order.size}</td>
                <td>{order.quantity}</td>
                <td>{completedOrder.paidAt}</td>
                <td>
                  <button className="btn btn-sm">Track</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
