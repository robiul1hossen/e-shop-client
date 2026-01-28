"use client";
import Title from "@/components/Title";
import axios from "axios";
import { Eye, MoveLeft, MoveRight, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";

const AllProductLists = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState({});
  useEffect(() => {
    const loadProducts = async () => {
      const res = await axiosSecure.get(
        `/products/query?page=${page}&limit=10`,
      );
      setProducts(res.data);
    };
    loadProducts();
  }, [page]);
  console.log(products);
  const allProducts = products.result || [];
  const paginationPages = [...Array(products?.totalPage)].map((_, i) => i + 1);
  return (
    <div className="">
      <div className="py-8 text-3xl text-center">
        <Title text1={"PRODUCTS"} text2={"LIST"} />
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
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product, index) => (
                <tr key={product?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <Image
                      width={40}
                      height={40}
                      src={product?.image}
                      alt={product?.name}
                      className="object-cover"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product?.price}</td>
                  <td>{product?.category}</td>
                  <td className="flex flex-wrap gap-2">
                    <Link href={`/products/${product._id}`}>
                      <button className="cursor-pointer btn btn-xs">
                        <Eye size={16} />
                      </button>
                    </Link>
                    <button className="cursor-pointer btn btn-xs">
                      <SquarePen size={16} />
                    </button>
                    <button className="cursor-pointer btn btn-xs">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bnt">
          <MoveLeft className="cursor-pointer" />
        </button>

        <div className="">
          {paginationPages.map((p) => (
            <button
              onClick={() => setPage(p)}
              key={p}
              className="btn btn-primary btn-sm mx-2">
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === products?.totalPage}
          className="bnt">
          <MoveRight className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default AllProductLists;
