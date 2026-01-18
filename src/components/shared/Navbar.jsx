"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    console.log("clicked");
    await axios
      .post(
        "http://localhost:3001/logout",
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <Link href="/">
        <li className="mx-2 font-medium">HOME</li>
      </Link>
      <Link href="/products">
        <li className="mx-2 font-medium">PRODUCTS</li>
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
        <Link href="/login" className="btn">
          Login
        </Link>
        <Link href="/register" className="btn">
          Register
        </Link>
        <button
          onClick={handleLogout}
          className="btn pointer-events-auto opacity-100 relative z-999">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
