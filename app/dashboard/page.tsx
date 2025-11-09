"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setResult(data.output || "AI could not generate content.");
    } catch (error) {
      console.error(error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const placeholderBlog = `
# 🌍 The Future of AI in Education

Artificial Intelligence (AI) is transforming classrooms by personalizing learning experiences and automating administrative tasks. In the next decade, AI tutors may become as common as textbooks.

### ✨ Summary
AI-driven education platforms are expected to adapt lessons in real time based on each student’s performance. This personalization can improve engagement and retention while reducing teacher workload.

### 🔑 Keywords
AI, Education, Personalization, EdTech, Automation
`;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <Card className="shadow-md border border-border/50">
        <CardHeader>
          <h2 className="text-xl font-semibold tracking-tight">
            Generate a New AI Blog Post
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter a topic and let AI craft a blog introduction, summary, and
            keywords.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="e.g. The Future of AI in Education"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />{" "}
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          <div className="mt-6 p-5 rounded-lg border bg-muted/30 backdrop-blur-sm">
            {loading ? (
              <p className="text-center text-sm text-muted-foreground animate-pulse">
                ✨ AI is thinking...
              </p>
            ) : result ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <article>{result}</article>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <article>{placeholderBlog}</article>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
