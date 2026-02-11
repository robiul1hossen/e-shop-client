"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import moment from "moment";

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
    completedOrder = myOrder;
  }

  const myData = completedOrder?.flatMap((order) =>
    order.cartOrderData.map((item) => ({
      ...item,
      paidAt: order.paidAt,
      transactionId: order.transactionId,
      totalPrice: order.totalPrice,
    })),
  );

  console.log(myData);

  return (
    <div>
      <div>
        <div className="py-8 text-3xl text-center">
          <Title text1={"MY"} text2={"ORDERS"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            impedit perspiciatis vero dolor, nesciunt cumque vitae
          </p>
        </div>
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
              <th>transaction Id</th>
              <th>Track</th>
            </tr>
          </thead>
          <tbody>
            {myData?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>
                  <Image
                    width={30}
                    height={30}
                    src={
                      order?.image ||
                      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                    }
                    alt={order?.productName || "product name"}
                  />
                </td>
                <td className="text-xs">{order?.productName}</td>
                <td className="text-end text-xs">{order.size}</td>
                <td className="text-end text-xs">{order.quantity}</td>
                <td className=" md:w-1/10 text-xs">
                  {moment(order.paidAt).format("DD-MM-YY")}
                </td>
                <td className="text-end text-xs">{order.transactionId}</td>
                <td className="text-end">
                  <button className="btn btn-sm text-xs">Track</button>
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
