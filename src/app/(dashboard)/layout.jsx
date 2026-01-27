import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Navbar />
        <div className="grid grid-cols-12 w-full md:gap-10 min-h-screen">
          <div className="col-span-2 md:col-span-3 md:py-4 border-r border-gray-300 bg-[#f9fafb] shadow-sm">
            <div className="flex flex-col gap-2 pl-2 md:pl-16">
              <Link
                href={"/"}
                className="flex gap-1 items-center border border-gray-300 border-r-0 px-1 md:px-3 py-2 bg-slate-50">
                <Image
                  width={18}
                  height={18}
                  src={"/addItem.png"}
                  alt="Home"
                  className="mx-auto md:mx-0"
                />
                <span className="hidden md:block">Home</span>
              </Link>
              <Link
                href={"/listItem"}
                className="flex gap-1 items-center border border-gray-300 border-r-0 px-1 md:px-3 py-2 bg-slate-50">
                <Image
                  width={18}
                  height={18}
                  src={"/listItem.png"}
                  alt="listItem"
                  className="mx-auto md:mx-0"
                />
                <span className="hidden md:block">Item List</span>
              </Link>
              <Link
                href={"/addProduct"}
                className="flex gap-1 items-center border border-gray-300 border-r-0 px-1 md:px-3 py-2 bg-slate-50">
                <Image
                  width={18}
                  height={18}
                  src={"/listItem.png"}
                  alt="listItem"
                  className="mx-auto md:mx-0"
                />
                <span className="hidden md:block">Add Product</span>
              </Link>
              <Link
                href={"/dashboard"}
                className="flex gap-1 items-center border border-gray-300 border-r-0 px-1 md:px-3 py-2 bg-slate-50">
                <Image
                  width={18}
                  height={18}
                  src={"/listItem.png"}
                  alt="dashboard"
                  className="mx-auto md:mx-0"
                />

                <span className="hidden md:block">Overview</span>
              </Link>
            </div>
          </div>
          <div className="col-span-10 md:col-span-9 px-2 md:px-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
