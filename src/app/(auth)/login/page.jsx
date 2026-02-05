"use client";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Suspense } from "react";
import Cookies from "js-cookie";

export const LoginForm = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async (data) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          // Cookies.set("token", res.data.token, { expires: 1, path: "/" });
          setUser(res.data.user);
          router.push(callbackUrl);
          router.refresh();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card-body">
      <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input outline-none"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            className="input outline-none"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
          <div>
            <p>
              New to this website please{" "}
              <Link href="/register" className="text-blue-600">
                register
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
        <Suspense fallback={<p>Login Loading...</p>}>
          {" "}
          <LoginForm />{" "}
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
