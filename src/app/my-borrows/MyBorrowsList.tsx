"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { authFetch } from "@/lib/token";
import { API_URL } from "@/lib/api";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function MyBorrowsList() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;
    authFetch(`${API_URL}/borrows`)
      .then((res) => res.json())
      .then((data) => setBorrows(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load borrows"))
      .finally(() => setLoading(false));
  }, [email]);

  const handleReturn = async (id: string) => {
    try {
      setReturningId(id);
      const res = await authFetch(`${API_URL}/borrows/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Return failed");
      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned successfully!");
    } catch {
      toast.error("Could not return the book");
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || loading) return <Spinner />;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">My Borrows</h1>

      {borrows.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <p className="text-muted-foreground">
            You have not borrowed any book yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Borrow Date</th>
                <th className="p-3">Return Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id} className="border-b last:border-0">
                  <td className="p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.bookImage}
                      alt={b.bookTitle}
                      className="h-16 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{b.bookTitle}</td>
                  <td className="p-3">{formatDate(b.borrowDate)}</td>
                  <td className="p-3">{formatDate(b.returnDate)}</td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm"
                      onClick={() => handleReturn(b._id)}
                      disabled={returningId === b._id}
                    >
                      {returningId === b._id ? "Returning..." : "Return Book"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
