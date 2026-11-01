import type { Metadata } from "next";
import ProfileCard from "./ProfileCard";

export const metadata: Metadata = {
  title: "BookNook | My Profile",
};

export default function ProfilePage() {
  return <ProfileCard />;
}