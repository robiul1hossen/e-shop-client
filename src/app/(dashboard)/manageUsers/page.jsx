"use client";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState } from "react";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const { data: users = {} } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=10`);
      return res.data;
    },
  });
  const allUsers = users.result || [];
  const paginationPages = [...Array(users?.totalPage)].map((_, i) => i + 1);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.createdAt}</td>
                <td>{user?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-2 my-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bnt">
          <MoveLeft className="cursor-pointer" />
        </button>

        <div className="">
          {paginationPages.map((p) => (
            <button
              onClick={() => setPage(p)}
              key={p}
              className="btn btn-primary btn-sm mx-2">
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === users?.totalPage}
          className="bnt">
          <MoveRight className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
