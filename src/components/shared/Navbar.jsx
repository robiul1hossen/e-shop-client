"use client";

import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  const { data: cartCount = 0 } = useQuery({
    queryKey: ["cartCount", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/cart/${user?.email}`,
      );
      return res.data;
    },
  });

  const links = (
    <>
      <Link href="/">
        <li className="mx-2 font-medium">HOME</li>
      </Link>
      <Link href="/products">
        <li className="mx-2 font-medium">PRODUCTS</li>
      </Link>

      <Link href="/about">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-999 mt-3 w-32 p-2 shadow text-gray-600 font-medium text-sm">
            {links}
          </ul>
        </div>
        <Link href="/">
          <Image
            width={100}
            height={100}
            loading="eager"
            className="w-full h-12 px-5"
            src="/logo-dark.png"
            alt="logo"
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
                  className="cursor-pointer w-auto h-auto"
                  alt="Profile"
                />

                <div className="p-4 hidden group-hover:flex flex-col absolute right-0 top-full -mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-999">
                  <Link href="/dashboard">
                    <li className="mx-2 font-medium list-none text-gray-500 mb-2">
                      DASHBOARD
                    </li>
                  </Link>
                  <Link href="/profile">
                    <li className="mx-2 font-medium list-none text-gray-500 mb-2">
                      PROFILE
                    </li>
                  </Link>
                  <hr />
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-left hover:bg-red-50 text-red-600 text-sm font-medium">
                    LOGOUT
                  </button>
                </div>
              </div>

              <div className="relative">
                <Image
                  height={18}
                  width={18}
                  src="/cart.png"
                  alt="Cart"
                  style={{ width: "auto", height: "auto" }}
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
