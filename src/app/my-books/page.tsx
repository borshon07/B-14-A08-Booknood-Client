import type { Metadata } from "next";
import MyBooksList from "./MyBooksList";

export const metadata: Metadata = {
  title: "BookNook | My Books",
};

export default function MyBooksPage() {
  return <MyBooksList />;
}