"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  console.log(user);

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
            <button
              onClick={logout}
              className="btn pointer-events-auto opacity-100 relative z-999">
              Logout
            </button>
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
