import type { Metadata } from "next";
import MyBorrowsList from "./MyBorrowsList";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
};

export default function MyBorrowsPage() {
  return <MyBorrowsList />;
}