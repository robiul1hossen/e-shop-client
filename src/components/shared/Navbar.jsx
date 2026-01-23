"use client";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/cart/${user?.email}`,
      );
      setCartCount(res.data);
    };
    if (user) {
      loadCart();
    }
  }, [user]);
  const links = (
    <>
      <Link href="/">
        <li className="mx-2 font-medium">HOME</li>
      </Link>
      <Link href="/products">
        <li className="mx-2 font-medium">PRODUCTS</li>
      </Link>
      <Link href="/addProduct">
        <li className="mx-2 font-medium">ADD PRODUCT</li>
      </Link>
      <Link href="/">
        <li className="mx-2 font-medium">ABOUT</li>
      </Link>
      <Link href="/">
        <li className="mx-2 font-medium">CONTACT</li>
      </Link>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-600 font-medium text-sm">
            {links}
          </ul>
        </div>
        <Link href="/">
          <Image
            width={100}
            height={100}
            className="w-full h-12 px-5"
            src="/logo-dark.png"
            alt=""
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-600 font-medium text-sm">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="flex gap-4 items-center">
              <div className="group relative py-2">
                <Image
                  height={18}
                  width={18}
                  src="/profile.png"
                  className="cursor-pointer"
                  alt="Profile"
                />

                <div className="hidden group-hover:flex flex-col absolute right-0 top-full -mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-999">
                  <button className="px-4 py-2 text-left hover:bg-gray-100 text-sm">
                    Profile
                  </button>
                  <button className="px-4 py-2 text-left hover:bg-gray-100 text-sm">
                    My Orders
                  </button>
                  <hr />
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-left hover:bg-red-50 text-red-600 text-sm font-medium">
                    Logout
                  </button>
                </div>
              </div>

              <div className="relative">
                <Image
                  height={18}
                  width={18}
                  src="/cart.png"
                  className=""
                  alt="Cart"
                />
                <div className="bg-black text-white rounded-full p-2 h-2 w-2 text-xs flex items-center justify-center text-center absolute top-2.5 left-1.75 cursor-pointer">
                  <span>{cartCount.length}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
