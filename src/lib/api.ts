export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

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

// get all books (query example: "?sort=newest&limit=6")
export async function getBooks(query = ""): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books${query}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// get one book by id
export async function getBook(id: string): Promise<Book | null> {
  const res = await fetch(`${API_URL}/books/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}