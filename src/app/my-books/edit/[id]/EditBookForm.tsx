"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";
import { authFetch } from "@/lib/token";
import { API_URL, type Book } from "@/lib/api";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function EditBookForm({ id }: { id: string }) {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/books/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setBook(data);
        if (data) {
          // if the saved category is not in the list, show it as custom
          if (categories.includes(data.category)) {
            setCategory(data.category);
          } else {
            setCategory("custom");
            setCustomCategory(data.category);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // upload new image to imgbb (only if user picks a new one)
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
    if (!book) return;
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const author = (form.elements.namedItem("author") as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;
    const totalCopies = Math.max(
      0,
      Number((form.elements.namedItem("totalCopies") as HTMLInputElement).value),
    );
    const file = (form.elements.namedItem("image") as HTMLInputElement)
      .files?.[0];

    const finalCategory =
      category === "custom" ? customCategory.trim() : category;
    if (!finalCategory) {
      toast.error("Please select or write a category");
      return;
    }

    try {
      setSaving(true);
      const image = file ? await uploadImage(file) : book.image;

      const res = await authFetch(`${API_URL}/books/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          author,
          category: finalCategory,
          description,
          totalCopies,
          image,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Update failed");
      }

      toast.success("Book updated successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (!book) return <p className="py-20 text-center">Book not found.</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="space-y-6 rounded-xl border bg-card p-8">
        <h1 className="text-center text-3xl font-bold">Edit Book</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input id="title" name="title" defaultValue={book.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              name="author"
              defaultValue={book.author}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
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
            <Label htmlFor="image">
              Book Image (leave empty to keep current)
            </Label>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.image}
              alt={book.title}
              className="h-24 w-20 rounded object-cover"
            />
            <Input id="image" name="image" type="file" accept="image/*" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalCopies">Total Copies</Label>
            <Input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min={0}
              defaultValue={book.totalCopies}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={book.description}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}