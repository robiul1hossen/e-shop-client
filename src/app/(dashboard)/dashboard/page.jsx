"use client";
import Title from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { ShoppingBag, ShoppingCart, StarHalf, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "@/lib/axiosSecure";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title as title2,
} from "chart.js";
import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import moment from "moment";
import { motion } from "framer-motion";

const OverView = () => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [userCount, setUserCount] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const { user } = useAuth();
  const { data: users = 0 } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/admin");
      return res.data;
    },
  });
  console.log(users);
  useEffect(() => {
    const loadTotalReviews = async () => {
      const res = await axiosSecure.get("/products/admin");
      setTotalReviews(res.data);
    };
    const loadTotalLCarts = async () => {
      const res = await axiosSecure.get("/cart/admin");
      setCartCount(res.data);
    };
    const loadUserCountByMonth = async () => {
      const res = await axiosSecure.get("/users-stats/admin");
      setUserCount(res.data);
    };
    const loadOrderedData = async () => {
      const res = await axiosSecure.get(`/myOrders/${user?.email}`);
      setOrdered(res.data);
    };
    loadTotalReviews();
    loadTotalLCarts();
    loadUserCountByMonth();
    loadOrderedData();
  }, [user]);

  const myData = ordered?.flatMap((order) =>
    order.cartOrderData.map((item) => ({
      ...item,
      paidAt: order.paidAt,
      transactionId: order.transactionId,
      totalPrice: order.totalPrice,
    })),
  );
  console.log(myData);

  // todo: change the data to real data
  const orderStats = {
    total: 100,
    pending: 30,
    completed: 70,
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    title2,
    Tooltip,
    Legend,
    ArcElement,
  );
  // bar chart data
  const labels = userCount.map((item) => `${item.month} ${item.year}`);
  const userCounts = userCount.map((item) => item.totalUsers);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Registered Users" },
    },

    scales: {
      x: {
        grid: { display: false },
      },
    },

    barPercentage: 0.6,
    categoryPercentage: 0.6,
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Users Registered",
        data: userCounts,
        backgroundColor: "#009966",
      },
    ],
  };
  // pic chart data
  const data2 = {
    labels: ["Pending Orders", "Completed Orders", "Total Orders"],
    datasets: [
      {
        label: "Order Status",
        data: [orderStats.pending, orderStats.completed, orderStats.total],
        backgroundColor: ["#f59e0b", "#10b981", "#334155"],

        borderColor: ["#f59e0b", "#10b981", "#334155"],
        borderWidth: 1,
      },
    ],
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Total Orders: ${orderStats.total}`,
      },
    },
  };
  console.log(myData);
  return user?.role === "admin" ? (
    <>
      <div className="py-8 text-3xl text-center">
        <Title text1={"QUICK"} text2={"OVERVIEW"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Users Data */}
        <div className=" h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl px-6 py-4 transition-all hover:scale-102 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <Users className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Total Users
            </h2>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">{users}</p>
              <span className="text-xs text-emerald-200 font-medium">+12%</span>
            </div>
          </div>
        </div>
        {/* Cart Data */}
        <div className=" h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl px-6 py-4 transition-all hover:scale-102 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Abandoned Carts
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">{cartCount}</p>
              <span className="text-xs text-emerald-200 font-medium">+23%</span>
            </div>
          </div>
        </div>
        {/* Reviews Data */}
        <div className=" h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-2xl px-6 py-4 transition-all hover:scale-102 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <StarHalf className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Reviews & Feedback
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">{totalReviews}</p>
              <span className="text-xs text-emerald-200 font-medium">+37%</span>
            </div>
          </div>
        </div>
        {/* Reviews Data */}
        <div className=" h-auto bg-linear-to-br from-emerald-500 to-emerald-700 shadow-emerald-900/20 rounded-xl px-6 py-4 transition-all hover:scale-102 cursor-pointer shadow-xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white/20 rounded-full mb-2">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <h2 className="font-semibold text-xs tracking-widest text-emerald-100 uppercase">
              Order Management
            </h2>

            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">120</p>
              <span className="text-xs text-emerald-200 font-medium">+23%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-6">
        <div className="flex-1 h-80 shadow-xl p-6 bg-white">
          <Bar options={options} data={data} />
        </div>
        <div className="flex-1 h-80 shadow-xl p-6 bg-white">
          <Pie data={data2} options={options2} />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="py-8 text-3xl text-center">
        <Title text1={"QUICK"} text2={"OVERVIEW"} />
      </div>
      <div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {myData.map((order) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              key={order._id}
              className="shadow px-4 py-2 rounded-lg bg-white">
              <Image
                width={100}
                height={100}
                className="w-25 h-32 object-cover"
                src={order?.image}
                alt=""
              />
              <p className="text-sm text-gray-500">{order?.productName}</p>
              {/* <p className="text-sm text-gray-500">${order.price}</p> */}
              <span className="text-xs text-gray-600">
                Paid At: {moment(order.paidAt).format("DD-MM-YY")}
              </span>
              <p className="text-sm text-gray-500">
                Quantity: {order.quantity}
              </p>
              <p className="text-xs text-gray-600">
                Transaction Id: {order.transactionId}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OverView;
