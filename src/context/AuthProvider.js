"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";
import axiosSecure from "@/lib/axiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axiosSecure.get(`/me`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const logout = async () => {
    try {
      await axiosSecure.post(`/logout`).then((res) => {
        if (res.data.success) {
          setUser(null);
          router.push("/");
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logout,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
