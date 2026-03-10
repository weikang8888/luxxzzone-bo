"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-[400px] space-y-8 bg-white p-10 border border-zinc-200">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="LuxxZone"
            width={48}
            height={48}
            className="mb-6 size-12 object-contain"
          />
          <h1 className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-950">
            Staff Login
          </h1>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-400">
            Authorized Personnel Only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email Address</Label>
            <Input
              type="email"
              placeholder="name@luxxzone.com"
              className="rounded-none border-zinc-200 focus-visible:ring-zinc-950"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Password</Label>
              <Link href="#" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors">
                Forgot?
              </Link>
            </div>
            <Input
              type="password"
              className="rounded-none border-zinc-200 focus-visible:ring-zinc-950"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-none bg-zinc-950 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-zinc-800"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-[10px] uppercase tracking-widest text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-zinc-950 underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
