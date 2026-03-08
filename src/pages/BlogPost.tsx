import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, loadPost } from "@/content/blog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const meta = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;
    loadPost(slug)
      .then(setContent)
      .catch(() => setError(true));
  }, [slug]);

  if (!meta || error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-6 text-center">
          <p className="font-mono text-muted-foreground">Post not found.</p>
          <Link to="/blog" className="font-mono text-primary text-sm hover:underline mt-4 inline-block">
            ← back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm mb-8 block"
            >
              <ArrowLeft size={16} />
              cd ~/blog
            </Link>

            {/* Title comes from the markdown content */}

            <div className="flex items-center gap-4 text-muted-foreground font-mono text-xs mb-8">
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} />
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {meta.readingTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-1 bg-secondary rounded text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {content ? (
            <div
              className="blog-content prose prose-invert max-w-none
                prose-headings:font-mono prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-ul:text-muted-foreground prose-ul:my-4
                prose-ol:text-muted-foreground prose-ol:my-4
                prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
                prose-table:text-muted-foreground
                prose-th:text-foreground prose-th:font-mono prose-th:text-sm
                prose-td:text-sm
                prose-hr:border-border"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="font-mono text-primary text-sm animate-pulse">loading post...</div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
