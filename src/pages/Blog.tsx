import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, loadPost } from "@/content/blog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm mb-6"
            >
              <ArrowLeft size={16} />
              cd ~
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="text-primary" size={28} />
              <h1 className="text-3xl md:text-4xl font-bold font-mono">
                <span className="text-primary">~/</span>blog
              </h1>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              {"// thoughts, tutorials, and code snippets"}
            </p>
          </motion.div>

          {blogPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-border rounded-lg"
            >
              <Terminal className="mx-auto text-muted-foreground mb-4" size={40} />
              <p className="text-muted-foreground font-mono text-sm">{"// no posts yet"}</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    onMouseEnter={() => loadPost(post.slug)}
                    className="group block bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs mb-3">
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
                    <h2 className="font-mono font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-2 py-1 bg-secondary rounded text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
