"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data) => {
    console.log(process.env.NEXT_PUBLIC_DOMAIN);
    await axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/register`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          router.push("/addProduct");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            Please Register Here!
          </h2>
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
      </div>
    </div>
  );
};

export default RegisterPage;
