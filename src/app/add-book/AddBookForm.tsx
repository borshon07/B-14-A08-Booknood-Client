"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";
import { authFetch } from "@/lib/token";
import { API_URL, type Book } from "@/lib/api";
import Image from "next/image";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [titleInput, setTitleInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setAllBooks(Array.isArray(data) ? data : []))
      .catch(() => setAllBooks([]));
  }, []);

  const suggestions =
    titleInput.trim().length >= 2
      ? allBooks
          .filter((b) =>
            b.title?.toLowerCase().includes(titleInput.trim().toLowerCase()),
          )
          .slice(0, 5)
      : [];

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      { method: "POST", body: formData },
    );
    const data = await res.json();
    if (!data.success) {
      throw new Error(data?.error?.message || "Image upload failed");
    }
    return data.data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const author = (form.elements.namedItem("author") as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;
    const totalCopies = Number(
      (form.elements.namedItem("totalCopies") as HTMLInputElement).value,
    );
    const file = (form.elements.namedItem("image") as HTMLInputElement)
      .files?.[0];

    const finalCategory =
      category === "custom" ? customCategory.trim() : category;

    if (!finalCategory) {
      toast.error("Please select or write a category");
      return;
    }
    if (!file) {
      toast.error("Please select a book image");
      return;
    }
    if (totalCopies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    try {
      setLoading(true);
      const image = await uploadImage(file);

      const book = {
        title,
        author,
        category: finalCategory,
        image,
        description,
        totalCopies,
      };

      const res = await authFetch(`${API_URL}/books`, {
        method: "POST",
        body: JSON.stringify(book),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to add book");
      }

      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <Spinner />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="space-y-6 rounded-xl border bg-card p-8">
        <h1 className="text-center text-3xl font-bold">Add a Book</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input
              id="title"
              name="title"
              required
              autoComplete="off"
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
                <p className="px-2 py-1 text-xs text-muted-foreground">
                  Similar books already in BookNook
                </p>
                {suggestions.map((b) => (
                  <div
                    key={b._id}
                    className="flex items-center gap-3 rounded px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <div className="relative h-10 w-8 overflow-hidden rounded">
                      <Image
                        src={b.image}
                        alt={b.title}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="text-xs text-muted-foreground">
                        by {b.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author Name</Label>
            <Input id="author" name="author" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="custom">+ Add new category</option>
            </select>

            {category === "custom" && (
              <Input
                placeholder="Write your category (e.g. Poetry)"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                maxLength={30}
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Book Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalCopies">Total Copies</Label>
            <Input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min={1}
              defaultValue={1}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea id="description" name="description" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>User Name</Label>
              <Input value={user?.name || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>User Email</Label>
              <Input value={user?.email || ""} readOnly />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </div>
    </div>
  );
}
