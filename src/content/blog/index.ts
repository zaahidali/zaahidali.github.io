export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
}

// Add new posts here — newest first
export const blogPosts: BlogPost[] = [
  {
    slug: "docker-patterns-that-matter",
    title: "Docker Patterns That Actually Matter",
    excerpt: "Multi-stage builds, health checks, and the logging rule — production container patterns I keep coming back to.",
    date: "2026-03-05",
    tags: ["docker", "devops", "infrastructure"],
    readingTime: "5 min read",
  },
  {
    slug: "why-i-stopped-using-orms",
    title: "Why I Stopped Using ORMs (And What I Use Instead)",
    excerpt: "After years of ORMs in production, I switched to query builders and raw SQL. Here's why.",
    date: "2026-02-20",
    tags: ["databases", "backend", "architecture"],
    readingTime: "4 min read",
  },
  {
    slug: "hello-world",
    title: "Hello, World!",
    excerpt: "My first blog post — why I'm writing and what to expect.",
    date: "2026-02-10",
    tags: ["meta"],
    readingTime: "2 min read",
  },
];

// To add a new post:
// 1. Create a .md file in src/content/blog/
// 2. Add an entry to the blogPosts array above (newest first)
// That's it!

// Dynamic import helper
export const loadPost = (slug: string): Promise<string> => {
  const modules = import.meta.glob("./*.md", { query: "?raw", import: "default" });
  const key = `./${slug}.md`;
  if (!modules[key]) throw new Error(`Post not found: ${slug}`);
  return modules[key]() as Promise<string>;
};
