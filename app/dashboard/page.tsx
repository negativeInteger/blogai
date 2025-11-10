"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Markdown from "@/components/markdown-preview";
import { useCompletion } from '@ai-sdk/react';
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Save, CheckCircle, Bot } from "lucide-react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { completion, input, handleInputChange, handleSubmit, error, isLoading } = useCompletion({
    api: '/api/generate',
    onFinish: () => {
      setHasGenerated(true);
    }
  });
  const [content, setContent] = useState<string>("");
  const handleBlogSave = async () => {
    setContent(completion)
    setLoading(true);
    const res = await fetch('/api/get-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, ai_prompt: input }),
    });
    
    return await res.json();
  }

  function handleBlogSaveWrap() {
    setLoading(true);
    setSaveSuccess(false);
    
    handleBlogSave()
      .then(async (res) => {
        res.user_id = user?.id;
        return await fetch('/api/save-blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: res }),
        });
      })
      .then(async (res) => {
        console.log(await res.json());
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000); // Reset success state after 2 seconds
      })
      .catch((error) => {
        console.error('Error saving blog post:', error);
        alert('Error saving blog post. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <Card className="shadow-md border border-border/50">
        <CardHeader className="text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Generate a New AI Blog Post
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter a topic and let AI craft a blog introduction, summary, and
            keywords.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {error && (
              <div className="fixed top-0 left-0 w-full p-4 text-center text-white bg-red-500">
                {error.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
              <Input
                className="flex-1"
                value={input}
                placeholder="e.g. The Future of AI in Education"
                onChange={handleInputChange}
              />
             <Button
                type="submit"
                disabled={hasGenerated}
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2"
              >
                {isLoading ? (
                  <>
                    <Spinner aria-label="Generating blog post" className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Generating...</span>
                  </>
                ) : hasGenerated && completion ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Generated</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span className="text-sm">Generate</span>
                  </>
                )}
              </Button>

            </form>
          </div>

          <div className="mt-6 p-2 rounded-lg">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                  <article><Markdown source={completion} /></article>
              </div>
          </div>
          <Button 
            onClick={handleBlogSaveWrap} 
            hidden={!loading && !completion.trim()}
            className={`w-full transition-all duration-200 cursor-pointer ${
              saveSuccess 
                ? 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500' 
                : loading 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : ''
            }`}
          >
            {loading ? (
              <>
                <Spinner aria-label="Saving blog post" />
                Saving to Collection...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved Successfully!
                {redirect('/dashboard/saved-blogs')}
                </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save to Collection
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
