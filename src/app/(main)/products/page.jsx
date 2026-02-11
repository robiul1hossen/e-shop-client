"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { ChevronDown, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Products = () => {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [foundData, setFoundData] = useState({});
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const { loading } = useAuth();

  console.log(cats);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/products/query?page=${page}&limit=10`,
      )
      .then((res) => {
        setFoundData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  console.log(foundData);

  const handleCatChange = (e) => {
    const { value, checked } = e.target;
    setCats((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/products/query?page=${page}&limit=10`,
      {
        params: { search, sort, cats },
      },
    );
    setFoundData(res.data);
  };
  const handleFilter = () => {
    setFilter(!filter);
  };
  const allProducts = foundData.result || [];
  const paginationPages = [...Array(foundData?.totalPage)].map((_, i) => i + 1);

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

          <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-6 rounded-r-md transition-all duration-300 shadow-md active:scale-95 cursor-pointer mt-3 uppercase">
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
                  value="Kid"
                  className="checkbox"
                />
                Kid
              </label>
            </fieldset>
            <div>
              <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-md active:scale-95 cursor-pointer mt-3 uppercase">
                Filter
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-12 md:col-span-9">
          {foundData?.result?.length > 0 ? (
            <>
              <div className=" px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {/* pagination */}
              <div className="flex items-center justify-center gap-2 my-6">
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
                  disabled={page === foundData?.totalPage}
                  className="bnt">
                  <MoveRight className="cursor-pointer" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-gray-600 ">{`No product found with "${search}"`}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
