"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  console.log("provider", process.env.NEXT_PUBLIC_DOMAIN);
  const userInfo = { user };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
