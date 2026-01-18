"use client";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import axios from "axios";
import { Rewind, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProductDetails = async () => {
      const res = await axios.get("/products.json");
      const singleProduct = res.data.find(
        (product) => Number(product.id) === Number(id),
      );
      setProduct(singleProduct);
      const relatedProducts = res.data.filter(
        (item) => item.category === singleProduct.category,
      );
      setRelated(relatedProducts);
      setLoading(false);
    };

    if (id) {
      loadProductDetails();
    }
  }, [id]);

  const revs = product?.reviews?.map((rev) => rev) || [];
  // console.log(revs);

  const { image, name, category, price, description } = product;
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-6xl mx-auto">
      <div className="pt-10 pb-12">
        <div className="p-5 rounded shadow flex flex-col md:flex-row gap-16">
          <div className="">
            <Image
              width={100}
              height={100}
              src={image}
              alt={name}
              className="w-full h-110 bg-slate-100 object-cover md:px-20 "
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mt-4">{name}</h1>
            <div className="flex gap-1 items-center">
              <span className="flex gap-1 py-3">
                <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
                <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
                <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
                <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
                <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
              </span>
              <span className="text-gray-600">(120)</span>
            </div>
            <p className="text-gray-600 w-3/4 my-4">{description}</p>
            <p className="text-2xl font-bold mt-4">${price}</p>
            <p className="mt-4">Select Size</p>
            <div className="flex gap-1 mt-3">
              <button className="btn btn-md text-base font-normal bg-slate-100">
                S
              </button>
              <button className="btn btn-md text-base font-normal bg-slate-100">
                M
              </button>
              <button className="btn btn-md text-base font-normal bg-slate-100">
                L
              </button>
              <button className="btn btn-md text-base font-normal bg-slate-100">
                XL
              </button>
              <button className="btn btn-md text-base font-normal bg-slate-100">
                XXL
              </button>
            </div>
            <div>
              <button className="text-white bg-black px-6 py-2 mt-10 cursor-pointer">
                ADD TO CART
              </button>
            </div>
            <div className="mt-6 text-gray-400 text-sm">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-8 text-3xl text-center">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <div className=" px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* reviews */}
      <div className="pt-8 text-3xl text-center md:text-start">
        <Title text1={"PRODUCT"} text2={"REVIEWS"} />
      </div>
      {revs.map((review, i) => (
        <div className="mt-8" key={i}>
          <>
            <div className="flex gap-5 items-center">
              <Image
                width={40}
                height={40}
                className="w-12 h-12 rounded-full object-cover"
                src={review.reviewerImage}
                alt=""
              />
              <div className="flex flex-col">
                <div className="flex">
                  <p className="text-gray-400">By </p>
                  <h4>
                    {review.reviewerName}{" "}
                    <span className="text-gray-400">
                      {/* {moment(review.date).format("DD MM YYYY")} */}
                      {review.date}
                    </span>
                  </h4>
                </div>
                <div>
                  <Rating
                    readonly
                    initialRating={review.rating}
                    emptySymbol={
                      <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
                    }
                    fullSymbol={
                      <Star fill="#ff5c39" stroke="#ff5c39" size={17} />
                    }
                    fractions={2}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="mb-3">{review?.reviewText}</h2>
              <span className="mt-5 text-gray-400">
                Was this review helpful to you?
              </span>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="btn bg-white shadow-sm rounded-lg text-gray-500">
                <FaRegThumbsUp /> Helpful
              </button>
              <button className="btn bg-white shadow-sm rounded-lg text-gray-500">
                <FaRegThumbsDown /> Not Helpful
              </button>
            </div>
          </>
        </div>
      ))}
      <div className="flex flex-col mt-10">
        <form>
          <div>
            <h2 className="text-xl font-bold">Add a Review</h2>
            <Rating
              emptySymbol={<Star stroke="#ff5c39" size={17} />}
              fullSymbol={<Star stroke="#ff5c39" size={17} />}
              fractions={2}
            />
          </div>
          <textarea
            name=""
            id=""
            placeholder="write a review"
            className="border outline-none w-full md:w-2/6 px-4 py-2"></textarea>
          <div className="md:w-2/6 mt-2 flex justify-end">
            <button
              type="submit"
              className="text-white bg-black px-6 py-2 mt-10 cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
