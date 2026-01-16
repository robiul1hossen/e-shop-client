import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="text-gray-700 cursor-pointer"
      href={`/products/${product.id}`}>
      <div className="md:overflow-hidden">
        <Image
          width={100}
          height={100}
          className="hover:scale-110 transition ease-in-out h-56.75 w-49.25 bg-slate-100 object-cover"
          src={product.image}
          alt=""
        />
        <p className="pt-3 pb-1 text-sm">{product.name}</p>
        <p className="text-sm font-medium">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
