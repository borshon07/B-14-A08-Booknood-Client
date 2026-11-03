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

// days left until the return date
const daysLeft = (date: string) =>
  Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          My Borrows
        </p>
        <h1 className="text-3xl md:text-5xl">Your Reading Journey</h1>
      </div>

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
              {borrows.map((b) => {
                const left = daysLeft(b.returnDate);
                return (
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
                    <td className="p-3">
                      <span className="whitespace-nowrap">
                        {formatDate(b.returnDate)}
                      </span>
                      <span
                        className={`ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs ${
                          left < 0
                            ? "bg-destructive/15 text-destructive"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {left < 0 ? "Overdue" : `${left} days left`}
                      </span>
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}