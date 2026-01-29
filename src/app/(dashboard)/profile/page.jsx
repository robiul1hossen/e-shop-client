"use client";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome Mr. {user?.name}</h1>
    </div>
  );
};

export default Profile;
