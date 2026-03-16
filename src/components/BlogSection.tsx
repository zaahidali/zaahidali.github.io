import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Terminal } from "lucide-react";
import { blogPosts, loadPost } from "@/content/blog";

const BlogSection = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="scroll-mt-24 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-sm mb-2">{"// latest posts"}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono">
            <span className="text-primary">blog</span>.recent()
          </h2>
        </motion.div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg mb-8">
            <Terminal className="mx-auto text-muted-foreground mb-3" size={32} />
            <p className="text-muted-foreground font-mono text-sm">
              {"// blog posts coming soon..."}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  onMouseEnter={() => loadPost(post.slug)}
                  className="group block bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs mb-2">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="font-mono font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline transition-colors"
          >
            view all posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
