"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";

const AdminRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const router = useRouter();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return router.push("/login");
  }
  if (user.role !== "admin") {
    router.push("/unauthorize");
    return;
  }
  return children;
};

export default AdminRoute;
