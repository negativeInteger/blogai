# BlogAI

A modern AI-powered blog generation platform built with Next.js that enables users to create high-quality, SEO-optimized blog posts using advanced language models.

## Overview

BlogAI is a sophisticated web application that leverages Google's Gemini AI model to generate engaging blog content. The platform provides a seamless experience for content creators to produce professional blog posts with automatically generated metadata, SEO optimization, and customizable formatting options.

## Features

### Core Functionality

- **AI-Powered Content Generation**: Utilizes Google Gemini 2.5 Pro for creating comprehensive blog posts
- **Intelligent Metadata Extraction**: Automatically generates titles, summaries, tags, and SEO descriptions
- **Real-time Content Streaming**: Live preview of content as it's being generated
- **Blog Management System**: Save, organize, and manage generated blog posts
- **SEO Optimization**: Built-in SEO features including meta descriptions, keywords, and structured content

### User Experience

- **Authentication System**: Secure user authentication powered by Clerk
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Mode**: Theme switching capabilities
- **Markdown Support**: Full markdown rendering and preview
- **Copy to Clipboard**: Easy content sharing functionality
- **Real-time Progress**: Loading states and completion indicators

### Technical Features

- **Database Integration**: Supabase for data persistence
- **Type Safety**: Full TypeScript implementation
- **Code Quality**: Biome for linting and formatting
- **Modern UI**: Radix UI components with custom styling
- **Server-Side Rendering**: Next.js App Router for optimal performance

## Technology Stack

### Frontend

- **Next.js 16**: React framework with App Router
- **React 19**: Latest React features and optimizations
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Accessible component primitives
- **Lucide React**: Modern icon library

### Backend & Services

- **Google Gemini AI**: Advanced language model for content generation
- **Supabase**: Database and authentication backend
- **Clerk**: User authentication and management
- **Vercel AI SDK**: Streaming AI completions

### Development Tools

- **Biome**: Fast linter and formatter
- **PostCSS**: CSS processing
- **ESLint**: Code quality enforcement

## Prerequisites

Before running this application, ensure you have:

- Node.js 18+ or Bun runtime
- A Google AI API key for Gemini access
- Supabase project with database setup
- Clerk authentication application

## Installation

1. **Clone the repository**

   ```bash
   git clone https://www.github.com/negativeInteger/blogai
   cd blogai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Database Setup**
   Configure your Supabase database with the required tables for blog storage.

## Development

### Running the Development Server

```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:3000`.

### Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format
```

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── generate/      # Blog generation endpoint
│   │   ├── get-data/      # Metadata extraction
│   │   └── save-blog/     # Blog persistence
│   ├── blogs/             # Blog viewing pages
│   ├── dashboard/         # User dashboard
│   └── utils/             # Utility functions
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Feature components
├── lib/                  # Libraries and utilities
│   └── supabase/         # Database client configuration
```

## API Endpoints

### POST /api/generate

Generates blog content using AI based on user prompt.

**Request:**

```json
{
  "prompt": "Blog topic description"
}
```

### POST /api/get-data

Extracts metadata from generated blog content.

**Request:**

```json
{
  "content": "Blog content",
  "ai_prompt": "Original prompt"
}
```

### POST /api/save-blog

Saves blog post to database.

**Request:**

```json
{
  "data": {
    "user_id": "UserId"
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
}
```

## Usage

1. **Authentication**: Sign up or sign in using Clerk
2. **Generate Content**: Enter a blog topic in the dashboard
3. **Review**: View the AI-generated content with real-time streaming
4. **Save**: Save the blog post to your collection
5. **Manage**: Access saved blogs through the dashboard
6. **Share**: Copy content or share blog links

## Configuration

### Content Generation Parameters

- **Model**: Google Gemini 2.5 Pro for main content, Gemini 2.5 Flash for metadata
- **Word Limit**: Maximum 500 words per blog post
- **Content Structure**: Includes hooks, problems, solutions, examples, and CTAs
- **SEO Features**: Automatic title optimization, meta descriptions, and keyword integration

### Database Schema

The application uses Supabase with a blogs table containing:

- Blog content and metadata
- User associations
- SEO-friendly slugs
- Timestamps and categorization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript typing
4. Run linting and formatting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
