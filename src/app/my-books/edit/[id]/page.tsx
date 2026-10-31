import type { Metadata } from "next";
import EditBookForm from "./EditBookForm";

export const metadata: Metadata = {
  title: "BookNook | Edit Book",
};

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditBookForm id={id} />;
}