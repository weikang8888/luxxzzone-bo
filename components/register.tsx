"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-[450px] space-y-8 bg-white p-10 border border-zinc-200 shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-950">
            Create Admin Account
          </h1>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-400">
            Join the Luxxzone Management Team
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">First Name</Label>
              <Input className="rounded-none border-zinc-200" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Last Name</Label>
              <Input className="rounded-none border-zinc-200" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Official Email</Label>
            <Input type="email" placeholder="admin@luxxzone.com" className="rounded-none border-zinc-200" required />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Access Key</Label>
            <Input type="text" placeholder="Enter invitation code" className="rounded-none border-zinc-200" required />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Password</Label>
            <Input type="password" className="rounded-none border-zinc-200" required />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-none bg-zinc-950 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-zinc-800"
          >
            {isLoading ? "Creating Account..." : "Confirm Registration"}
          </Button>
        </form>

        <div className="text-center text-[10px] uppercase tracking-widest text-zinc-400">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-zinc-950 underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
