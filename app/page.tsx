"use client";

import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "@/components/auth-modal";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"signIn" | "signUp" | null>(null);
  const { user } = useUser();
  if (user) redirect("/dashboard");
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-between font-arimo">
      <Navbar setAuthMode={setAuthMode} />
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 max-w-4xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Generate AI-Powered Blogs Instantly
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Describe your niche or passion, and let AI create blog posts.
        </p>
        <form className="flex gap-4 items-center w-2xl">
          <Input type="text" placeholder="Enter your blog topic..." />
          <Button size="sm" onClick={() => router.push("/generate")}>
            Get Started
          </Button>
        </form>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-8 mt-20 mb-20 w-full max-w-6xl">
        {[
          {
            title: "Smart Blog Creation",
            desc: "AI crafts engaging, SEO-optimized blog posts tailored to your niche.",
          },
          {
            title: "Save to Collection",
            desc: "Generate complete blog posts in seconds with one click.",
          },
          {
            title: "Customizable Outputs",
            desc: "Adjust tone, style, length, and target audience effortlessly.",
          },
        ].map((f) => (
          <Card key={f.title} className="p-4">
            <CardContent className="text-center">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t w-full py-4 text-center text-sm text-muted-foreground">
        @ {new Date().getFullYear()} BlogAI. All rights reserved.
      </footer>

      {authMode && (
        <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
      )}
    </main>
  );
}
