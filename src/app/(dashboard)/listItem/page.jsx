"use client";
import Title from "@/components/Title";
import axios from "axios";
import {
  Eye,
  Images,
  MoveLeft,
  MoveRight,
  SquarePen,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AllProductLists = () => {
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState({});
  const [preview, setPreview] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/query?page=${page}&limit=10`,
      );
      return res.data;
    },
  });

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
        const res = await axiosSecure.delete(`/product/${id}`);
        if (res.data.deletedCount) {
          refetch();
          toast.success("Product deleted Successfully");
        }
      }
    });
  };
  const handleOpenModal = (product) => {
    setProduct(product);
    modalRef.current.showModal();
  };

  const handleCatChange = (e) => {
    const { value, checked } = e.target;
    setSizes((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value),
    );
  };
  const closeModal = () => {
    modalRef.current.close();
  };
  const handleEditProduct = async (data) => {
    const updatedProduct = {};

    if (data.productName?.trim()) {
      updatedProduct.name = data.productName;
    }
    if (data.price) {
      updatedProduct.price = Number(data.price);
    }
    if (category) {
      updatedProduct.category = category;
    }
    if (sizes?.length) {
      updatedProduct.size = sizes;
    }
    if (data.description?.trim()) {
      updatedProduct.description = data.description;
    }
    if (Object.keys(updatedProduct).length === 0) {
      return closeModal();
    }

    const res = await axiosSecure.patch(
      `/products/${product._id}`,
      updatedProduct,
    );
    if (res.data.modifiedCount) {
      toast.success("Product Updated");
    }

    closeModal();
  };

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
                      className="object-cover h-auto w-auto"
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
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="cursor-pointer btn btn-xs">
                      <SquarePen size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="cursor-pointer btn btn-xs">
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
      {/* Edit Modal  */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          {/*  */}
          <div className="flex items-center justify-center w-full ">
            <form
              onSubmit={handleSubmit(handleEditProduct)}
              className=" w-full">
              <fieldset className="fieldset w-full">
                <label className="label">Product Name</label>
                <input
                  type="text"
                  defaultValue={product?.name}
                  className="input outline-none w-full"
                  placeholder="Product Name"
                  {...register("productName", { required: false })}
                />

                <div>
                  <label className="label">Price</label>
                  <input
                    type="number"
                    defaultValue={product?.price}
                    className="input outline-none w-full"
                    placeholder="Price"
                    {...register("price", { required: false })}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                  <fieldset className="fieldset bg-gray-50 border-base-300 rounded-box border p-4 w-full ">
                    <label htmlFor="" className="text-lg">
                      {" "}
                      Select Sizes
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="label">
                        <input
                          onChange={handleCatChange}
                          defaultChecked={product?.size?.some((s) => s === "S")}
                          type="checkbox"
                          value="S"
                          className="checkbox"
                        />
                        S
                      </label>
                      <label className="label">
                        <input
                          onChange={handleCatChange}
                          defaultChecked={product?.size?.some((s) => s === "M")}
                          type="checkbox"
                          value="M"
                          className="checkbox"
                        />
                        M
                      </label>
                      <label className="label">
                        <input
                          onChange={handleCatChange}
                          defaultChecked={product?.size?.some((s) => s === "L")}
                          type="checkbox"
                          value="L"
                          className="checkbox"
                        />
                        L
                      </label>
                      <label className="label">
                        <input
                          onChange={handleCatChange}
                          defaultChecked={product?.size?.some(
                            (s) => s === "XL",
                          )}
                          type="checkbox"
                          value="XL"
                          className="checkbox"
                        />
                        XL
                      </label>
                      <label className="label">
                        <input
                          onChange={handleCatChange}
                          defaultChecked={product?.size?.some(
                            (s) => s === "XXL",
                          )}
                          type="checkbox"
                          value="XXL"
                          className="checkbox"
                        />
                        XXL
                      </label>
                    </div>
                  </fieldset>
                  <div className="w-full">
                    <label htmlFor="" className="text-lg">
                      Select Category
                    </label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      defaultValue={product.category}
                      className="select outline-none mb-5 bg-gray-50 w-full">
                      <option disabled={true}>Select Category</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kid">Kid</option>
                    </select>
                  </div>
                </div>

                <label className="label">Description</label>
                <input
                  type="text"
                  defaultValue={product?.description}
                  className="input outline-none w-full"
                  placeholder="Description"
                  {...register("description", { required: false })}
                />

                <button className="btn btn-neutral mt-4">UPDATE PRODUCT</button>
              </fieldset>
            </form>
          </div>
          {/*  */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllProductLists;
