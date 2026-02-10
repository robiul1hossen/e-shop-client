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

  // const myData =
  //   completedOrder?.reduce((acc, order) => {
  //     return acc.concat(order.cartOrderData);
  //   }, []) || [];
  // console.log(myData);
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
            {myData?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>
                  <Image
                    width={40}
                    height={40}
                    src={
                      order?.image ||
                      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                    }
                    alt={order?.productName}
                  />
                </td>
                <td></td>
                <td>{order.size}</td>
                <td>{order.quantity}</td>
                <td>{moment(order.paidAt).format("DD-MM-YY")}</td>
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
