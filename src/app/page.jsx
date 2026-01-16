import BestSales from "@/components/BestSales";
import HeroBanner from "@/components/HeroBanner";
import LatestProducts from "@/components/LatestProducts";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <LatestProducts />
      <BestSales />
    </div>
  );
}
