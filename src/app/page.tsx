import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
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
      <Suspense fallback={<Spinner />}>
        <NewArrivals />
      </Suspense>
      <HowItWorks />
      <TopCategories />
    </>
  );
}