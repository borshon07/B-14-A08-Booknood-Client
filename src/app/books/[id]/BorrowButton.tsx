"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BorrowButton({
  bookId,
  bookTitle,
  totalCopies,
}: {
  bookId: string;
  bookTitle: string;
  totalCopies: number;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copies, setCopies] = useState(totalCopies);

  const unavailable = copies <= 0;

  const handleBorrow = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          userName: user?.name,
          userEmail: user?.email,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not borrow the book");
        return;
      }

      toast.success("Book borrowed successfully!");
      setCopies((c) => c - 1);
      setOpen(false);
      router.push("/my-borrows");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-sm">
        Available copies: <span className="font-semibold">{copies}</span>
      </p>

      <Button size="lg" disabled={unavailable} onClick={() => setOpen(true)}>
        {unavailable ? "Not Available" : "Borrow This Book"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow &quot;{bookTitle}&quot;</DialogTitle>
            <DialogDescription>
              You can keep this book for 7 days.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>User Name</Label>
              <Input value={user?.name || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>User Email</Label>
              <Input value={user?.email || ""} readOnly />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBorrow} disabled={loading}>
              {loading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}