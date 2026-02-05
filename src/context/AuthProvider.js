"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/me`, {
          withCredentials: true,
        });
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
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_DOMAIN}/logout`,
          {},
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          if (res.data.success) {
            Cookies.remove("token");
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
