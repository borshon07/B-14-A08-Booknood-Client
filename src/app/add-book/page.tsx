import type { Metadata } from "next";
import AddBookForm from "./AddBookForm";

export const metadata: Metadata = {
  title: "BookNook | Add Book",
};

export default function AddBookPage() {
  return <AddBookForm />;
}