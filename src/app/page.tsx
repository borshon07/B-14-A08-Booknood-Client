import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";

export const metadata: Metadata = {
  title: "BookNook | Home",
};

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Suspense
        fallback={<p className="py-16 text-center">Loading books...</p>}
      >
        <NewArrivals />
      </Suspense>
      <HowItWorks />
      <TopCategories />
    </>
  );
}