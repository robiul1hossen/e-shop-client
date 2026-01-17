import BestSales from "@/components/BestSales";
import HeroBanner from "@/components/HeroBanner";
import LatestProducts from "@/components/LatestProducts";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <LatestProducts />
      <BestSales />
      <Footer />
    </div>
  );
}
