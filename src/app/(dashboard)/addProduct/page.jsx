"use client";
import Title from "@/components/Title";
import axiosSecure from "@/lib/axiosSecure";
import axios from "axios";
import { Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleAddProduct = (data) => {
    const productImage = data.image[0];
    const formData = new FormData();
    formData.append("image", productImage);
    const imageHostingUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY}`;
    axios
      .post(imageHostingUrl, formData)
      .then(async (res) => {
        const photoURL = res.data?.data?.url;
        const product = {
          name: data.productName,
          category: category,
          price: Number(data.price),
          size: sizes,
          description: data.description,
          image: photoURL,
          reviews: [],
        };
        const result = await axiosSecure.post("/product", product);
        if (result.data.insertedId) {
          toast.success("Product added successfully");
          reset();
        }
      })
      .catch((error) => console.log(error));
  };
  const handleCatChange = (e) => {
    const { value, checked } = e.target;
    setSizes((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value),
    );
  };
  return (
    <div className="mb-10">
      <div className="py-8 text-xs sm:text-sm md:text-3xl text-center">
        <Title text1={"ADD"} text2={"PRODUCT"} />
        <p className=" w-full md:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div className="flex items-center justify-center w-full ">
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className=" w-full md:w-1/2">
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
            <div>
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
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="w-full">
                <label className="label">Image</label>
                <input
                  type="file"
                  className="input outline-none hidden"
                  id="image"
                  accept="image/png, image/jpeg"
                  placeholder="Image"
                  {...register("image", {
                    required: true,
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    },
                  })}
                />
                <label htmlFor="image" className="cursor-pointer">
                  {preview ? (
                    <Image
                      width={50}
                      height={50}
                      src={preview}
                      alt="preview"
                      className="w-16 md:w-full h-auto object-cover rounded"
                    />
                  ) : (
                    <Images size={50} />
                  )}
                </label>
                {errors.image && (
                  <p className="text-red-500 text-sm">Image is required</p>
                )}
              </div>
              <fieldset className="fieldset bg-gray-50 border-base-300 rounded-box border p-4 w-full ">
                <label htmlFor="" className="text-lg">
                  {" "}
                  Select Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="label">
                    <input
                      onChange={handleCatChange}
                      type="checkbox"
                      value="S"
                      className="checkbox"
                    />
                    S
                  </label>
                  <label className="label">
                    <input
                      onChange={handleCatChange}
                      type="checkbox"
                      value="M"
                      className="checkbox"
                    />
                    M
                  </label>
                  <label className="label">
                    <input
                      onChange={handleCatChange}
                      type="checkbox"
                      value="L"
                      className="checkbox"
                    />
                    L
                  </label>
                  <label className="label">
                    <input
                      onChange={handleCatChange}
                      type="checkbox"
                      value="XL"
                      className="checkbox"
                    />
                    XL
                  </label>
                  <label className="label">
                    <input
                      onChange={handleCatChange}
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
                  defaultValue="Sort By Price"
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
