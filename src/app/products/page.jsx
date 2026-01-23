"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [foundData, setFoundData] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DOMAIN}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setFoundData(products);
  }, [products]);

  const handleCatChange = (e) => {
    const { value, checked } = e.target;
    setCats((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/products/query?`,
      {
        params: { search, sort, cats },
      },
    );
    setFoundData(res.data);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-8 text-3xl text-center">
        <Title text1={"ALL"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4 w-full">
            <h2 className="font-bold text-xl">Filter By Category</h2>
            <label className="label">
              <input
                onChange={handleCatChange}
                type="checkbox"
                value="Men"
                className="checkbox"
              />
              Men
            </label>
            <label className="label">
              <input
                onChange={handleCatChange}
                type="checkbox"
                value="Women"
                className="checkbox"
              />
              Women
            </label>
            <label className="label">
              <input
                onChange={handleCatChange}
                type="checkbox"
                value="Kids"
                className="checkbox"
              />
              Kid
            </label>
          </fieldset>

          <select
            onChange={(e) => setSort(e.target.value)}
            defaultValue="Sort By Price"
            className="select outline-none">
            <option disabled={true}>Sort By Price</option>
            <option value="dec">High-Low</option>
            <option value="asc">Low-High</option>
          </select>
          <br />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Here"
            className="input outline-none"
          />
          <div>
            <button
              type="submit"
              className="text-white bg-black px-6 py-2 mt-2 cursor-pointer">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className=" px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {foundData.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
