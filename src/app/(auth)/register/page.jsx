"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/register`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          Cookies.set("token", res.data.token, { expires: 1, path: "/" });
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
      <h2 className="text-2xl font-bold text-center">Please Register Here!</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            className="input outline-none"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
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
          <button className="btn btn-neutral mt-4">Sign up</button>
          <div>
            <p>
              Already have an account please{" "}
              <Link href="/login" className="text-blue-600">
                login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
        <Suspense fallback={<p>Register Loading...</p>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
};
export default RegisterPage;
