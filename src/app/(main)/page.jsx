import BestSales from "@/components/BestSales";
import HeroBanner from "@/components/HeroBanner";
import LatestProducts from "@/components/LatestProducts";
import ReviewSection from "@/components/ReviewSection";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <LatestProducts />
      <BestSales />
      <ReviewSection />
    </div>
  );
}
