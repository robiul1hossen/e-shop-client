"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const registerUser = async (data) => {
    return await axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/register`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          router.push(callbackUrl);
          router.refresh();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = async (data) => {
    return await axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          router.push(callbackUrl);
          router.refresh();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    loginUser,
    registerUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
