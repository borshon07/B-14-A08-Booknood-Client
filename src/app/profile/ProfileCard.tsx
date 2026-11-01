"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/Spinner";

export default function ProfileCard() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;

    setSaving(true);
    const { error } = await authClient.updateUser({ name, image });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Update failed");
      return;
    }
    toast.success("Profile updated!");
    setEditing(false);
  };

  if (isPending) return <Spinner />;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="space-y-6 rounded-xl border bg-card p-8 text-center">
        <h1 className="text-3xl font-bold">My Profile</h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.image || "https://i.ibb.co/placeholder/user.png"}
          alt={user.name}
          className="mx-auto h-28 w-28 rounded-full border-4 border-primary object-cover"
        />

        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Photo URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                defaultValue={user.image || ""}
                required
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button onClick={() => setEditing(true)}>Update Profile</Button>
          </>
        )}
      </div>
    </div>
  );
}