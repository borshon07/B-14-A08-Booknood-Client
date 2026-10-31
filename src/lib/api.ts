const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  addedBy: { name: string; email: string };
  createdAt: string;

};

export async function getBooks(query = ""): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books${query}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
export async function getBook(id: string): Promise<Book | null> {
  const res = await fetch(`${API_URL}/books/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function getMyBooks(email: string): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books?email=${encodeURIComponent(email)}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}