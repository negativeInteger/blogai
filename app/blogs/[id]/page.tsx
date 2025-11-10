"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MarkdownPreview from "@uiw/react-markdown-preview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Clock,
  Copy,
  Share2,
  Edit,
  Loader2,
} from "lucide-react";
import { useSupabase } from "@/lib/supabase/client";
import formatDate from "@/app/utils/formatDate";

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  created_at: string;
  word_count: number;
  read_time: number;
  keywords: string[];
  metadata?: {
    category?: string;
  };
}

export default function BlogPage() {
  const { id } = useParams();
  const { getSupabaseClient } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const supabase = await getSupabaseClient();
        const { data, error } = await supabase
          .from("blogs")
          .select()
          .eq("id", id)
          .single();
        console.log(data)
        if (error) throw new Error("Failed to load blog");
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        }
    }
    fetchBlog();
  }, [id, getSupabaseClient]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        <Loader2 />
      </div>
    );
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(blog.content);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blogs
      </Button>

      {/* Header Section */}
      <Card className="border-0 shadow-md bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs font-medium">
              {blog.metadata?.category || "General"}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(blog.created_at)}
            </div>
          </div>

          <CardTitle className="text-3xl font-bold leading-tight bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {blog.title}
          </CardTitle>

          <p className="text-muted-foreground text-base leading-relaxed">
            {blog.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{blog.word_count.toLocaleString()} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.read_time} min read</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Markdown Content */}
      <Card className="border-0 shadow-md bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardContent>
          <MarkdownPreview
            source={blog.content}
            style={{
              backgroundColor: "transparent",
              color: "inherit",
              fontSize: "15px",
              lineHeight: "1.8",
            }}
            className="prose prose-neutral dark:prose-invert max-w-none"
          />
        </CardContent>
      </Card>

      {/* Keywords and Actions */}
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-4 py-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {blog.keywords?.map((keyword) => (
            <Badge
              key={keyword}
              variant="secondary"
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
            >
              {keyword}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-900 dark:hover:text-orange-300"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </div>
  );
}
