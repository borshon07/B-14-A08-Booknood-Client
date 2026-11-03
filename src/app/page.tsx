import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeatureBar from "@/components/home/FeatureBar";
import Collections from "@/components/home/Collections";
import NewArrivals from "@/components/home/NewArrivals";
import Recommendation from "@/components/home/Recommendation";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import Promo from "@/components/home/Promo";
import Events from "@/components/home/Events";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "BookNook | Home",
};

export default function Home() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <HeroSection />
      </Suspense>
      <FeatureBar />
      <Suspense fallback={<Spinner />}>
        <NewArrivals />
        <Suspense fallback={null}>
          <Collections />
        </Suspense>
      </Suspense>
      <Suspense fallback={null}>
        <Recommendation />
      </Suspense>
      <HowItWorks />
      <Suspense fallback={null}>
        <TopCategories />
      </Suspense>
      <Promo />
      <Events />
    </>
  );
}
