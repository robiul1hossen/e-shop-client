"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [foundData, setFoundData] = useState([]);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState(false);
  const { loading } = useAuth();

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
  const handleFilter = () => {
    setFilter(!filter);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-6 text-3xl text-center">
        <Title text1={"ALL"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
      <div className="text-end mb-4">
        <form
          onSubmit={handleSubmit}
          className="flex justify-end items-end mx-4 md:px-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Here"
            className="input outline-none rounded-r-none"
          />

          <button
            type="submit"
            className="text-white bg-black px-6 py-2 mt-2 rounded-r-md cursor-pointer">
            Search
          </button>
        </form>
      </div>
      <div>
        <h2 className="font-bold text-2xl text-gray-600 ml-6 mb-2 md:hidden flex items-center">
          Filter{" "}
          <span onClick={handleFilter}>
            {filter ? <ChevronDown /> : <ChevronRight />}
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div
          className={`md:grid md:col-span-3 my-4 ${filter ? "grid col-span-12 ml-6 md:ml-0 w-3/4 md:w-full " : "hidden"}`}>
          <form onSubmit={handleSubmit}>
            <select
              onChange={(e) => setSort(e.target.value)}
              defaultValue="Sort By Price"
              className="select outline-none mb-5 bg-gray-50 w-full">
              <option disabled={true}>Sort By Price</option>
              <option value="dec">High-Low</option>
              <option value="asc">Low-High</option>
            </select>
            <fieldset className="fieldset bg-gray-50 border-base-300 rounded-box border p-4 w-full ">
              <h2 className="font-bold text-xl text-gray-600">Category</h2>
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
            <div>
              <button
                type="submit"
                className="text-white bg-black px-6 py-2 mt-2 cursor-pointer">
                Filter
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className=" px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foundData.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
