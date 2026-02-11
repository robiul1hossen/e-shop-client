"use client";
import Title from "@/components/Title";
import axiosSecure from "@/lib/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft, MoveRight, Trash2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const { data: users = {}, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=10`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/user/admin/${id}`);
        if (res.data.deletedCount) {
          toast.success("User deleted!");
          refetch();
        }
        console.log(res.data);
      }
    });
  };

  console.log(users.result);
  const allUsers = users.result || [];
  const paginationPages = [...Array(users?.totalPage)].map((_, i) => i + 1);
  return (
    <div>
      <div className="py-8 text-3xl text-center">
        <Title text1={"MANAGE"} text2={"USERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          impedit perspiciatis vero dolor, nesciunt cumque vitae
        </p>
      </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{moment(user?.createdAt).format("DD-MM-YYYY")}</td>
                <td>{user?.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </td>
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
