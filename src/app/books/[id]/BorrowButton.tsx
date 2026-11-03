"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authFetch } from "@/lib/token";
import { API_URL } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      const res = await authFetch(`${API_URL}/borrows`, {
        method: "POST",
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(data?.message || "Could not borrow the book");
        if (data?.message === "Not Available") setCopies(0);
        setOpen(false);
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
      <Button
        size="lg"
        className="w-full sm:w-auto"
        disabled={unavailable}
        onClick={() => setOpen(true)}
      >
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