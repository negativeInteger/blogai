"use client";

import { useUser } from "@clerk/nextjs";
import { Calendar, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogHistory {
  id: string;
  title: string;
  summary: string;
  date: string;
  keywords: string[];
}

export default function HistoryPage() {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<BlogHistory[]>([]);

  useEffect(() => {
    // Simulate loading + mock data
    if (isSignedIn) {
      fetch("/api/sync-user", { method: "POST" });
    }
    setTimeout(() => {
      const mockHistory: BlogHistory[] = [
        {
          id: "1",
          title: "The Future of AI in Education",
          summary:
            "Explores how AI tools are transforming learning through personalization and automation...",
          date: "Nov 8, 2025",
          keywords: ["AI", "Education", "Automation"],
        },
        {
          id: "2",
          title: "Sustainable Tech: Green Computing Revolution",
          summary:
            "A deep dive into how sustainable computing practices are reducing carbon footprints in IT.",
          date: "Nov 7, 2025",
          keywords: ["Sustainability", "Green Tech", "Cloud"],
        },
      ];

      setHistory(mockHistory);
      setLoading(false);
    }, 1200);
  }, [isSignedIn]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold">Your AI Blog History</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {["skeleton-1", "skeleton-2", "skeleton-3"].map((key) => (
            <Card key={key} className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-8 w-24 mt-4" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="text-4xl">📝</div>
        <h3 className="text-xl font-semibold">No Blogs Generated Yet</h3>
        <p className="text-muted-foreground max-w-md">
          You haven’t generated any AI blogs yet. Try creating one to see your
          history here.
        </p>
        <Button asChild>
          <a href="/dashboard">Generate a Blog</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Your AI Blog History</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {history.map((blog) => (
          <Card
            key={blog.id}
            className="flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {blog.title}
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Calendar className="w-3 h-3 mr-1" /> {blog.date}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {blog.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.keywords.map((kw) => (
                  <Badge key={kw} variant="secondary">
                    {kw}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" size="sm">
                <Copy className="h-4 w-4 mr-1" /> Copy Summary
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
