import parseLLMJsonOutput from '@/app/utils/parseLLMJsonOutput';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';



export async function POST(request: Request) {
  const { content, ai_prompt } = await request.json();

  const systemPrompt = `Given this content of a blog post, extract the following information as a JSON object:
  {
    "title": "The SEO-optimized title of the blog post",   
    "summary": "A concise 2-3 sentence summary highlighting key benefits and takeaways",
    "content": ${content},
    "tags": ["List", "of", "relevant", "tags", "for", "the", "blog", "post"],
    "ai_prompt": ${ai_prompt},   
    "word_count": Total number of words in the blog post,
    "read_time": Estimated read time in minutes,
    "metadata": {
      "seo_description": "A click-worthy meta description with primary keyword and clear benefit",
      "keywords": ["List", "of", "focus", "keywords"],   
      "category": "The most relevant category for this blog post" 
    }
`
  const result = await generateText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    prompt: `Extract metadata from the following blog content: ${content}`,
  });
  
  // Parse the generated text as JSON and return it
  try {
    const metadata = result.text;
    const parsedMetadata = parseLLMJsonOutput(metadata);
    return Response.json(parsedMetadata);
  } catch (error) {
    console.error('Failed to parse metadata JSON:', error);
    return Response.json({ error: 'Failed to extract metadata' }, { status: 500 });
  }
}
