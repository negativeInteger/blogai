"use client";

import { useUser } from "@clerk/nextjs";
import { Calendar, Copy, Eye, Clock, BookOpen, Tag, FileText, Share2, Edit } from "lucide-react";
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
import { useSupabase } from "@/lib/supabase/client";
import Link from "next/link";
import formatDate from "@/app/utils/formatDate";
import copyToClipboard from "@/app/utils/copyToClipboard";

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  created_at: string;
  ai_prompt: string;
  keywords: string[];
  content: string;
  word_count: number;
  read_time: number;
  metadata: {
    seo_description: string;
    keywords: string[];
    category: string;
  };
}

export default function SavedBlogsPage() {
  const { user, isLoaded } = useUser();
  const { getSupabaseClient } = useSupabase();
  const [loading, setLoading] = useState(true);
  const [savedBlogs, setSavedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function fetchSavedBlogs() {
      if (!user) {
        console.log("No user logged in");
        setLoading(false);
        return;
      }
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("user_id", user.id);

      if (error) console.error("Error fetching blogs:", error);
      else setSavedBlogs(data);
      setLoading(false);
    }

    fetchSavedBlogs();
  }, [isLoaded, user, getSupabaseClient]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 p-6">
        {/* Header Skeleton */}
        <div className="text-center space-y-3">
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
          <div className="flex justify-center items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((skeletonId) => (
            <Card key={skeletonId} className="space-y-4 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-16" />
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (savedBlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 p-8">
        <div className="w-32 h-32 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
          <FileText className="w-16 h-16 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            No Blogs Generated Yet
          </h3>
          <p className="text-muted-foreground max-w-md text-lg">
            Start your AI-powered writing journey! Generate your first blog post and watch your collection grow.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <a href="/dashboard" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Generate Your First Blog
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      'technology': <FileText className="w-4 h-4" />,
      'business': <BookOpen className="w-4 h-4" />,
      'education': <BookOpen className="w-4 h-4" />,
      'lifestyle': <Tag className="w-4 h-4" />,
      'health': <Tag className="w-4 h-4" />,
      'default': <FileText className="w-4 h-4" />
    };
    return iconMap[category?.toLowerCase()] || iconMap['default'];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your AI Blog Collection
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage and explore your AI-generated blog posts
        </p>
        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{savedBlogs.length} blogs</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{savedBlogs.reduce((acc, blog) => acc + blog.word_count, 0).toLocaleString()} words</span>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBlogs.map((blog) => (
          <Card
            key={blog.id}
            className="group hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
          >
            {/* Card Header with Category Badge */}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(blog.metadata?.category)}
                  <Badge variant="outline" className="text-xs font-medium">
                    {blog.metadata?.category || 'General'}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(blog.created_at)}
                </div>
              </div>
              <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </CardTitle>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {blog.summary}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-between text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{blog.word_count} words</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{blog.read_time} min read</span>
                </div>
              </div>

              {/* Tags */}
              {blog.keywords && blog.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {blog.keywords.slice(0, 3).map((keyword) => (
                    <Badge 
                      key={keyword} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                  {blog.keywords.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{blog.keywords.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>

            {/* Card Footer with Actions */}
            <CardFooter className="pt-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(blog.summary, 'Summary')}
                className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900 dark:hover:text-green-300"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
                >
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-900 dark:hover:text-orange-300"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
