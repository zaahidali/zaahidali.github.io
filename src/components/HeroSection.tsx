import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

const roles = [
  "Full Stack Software Engineer",
  "MS CS @ University of Iceland",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(142 72% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 72% 50%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-primary text-sm mb-4">
            {"// Hello, World!"}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-mono leading-tight mb-4">
            Zahid
            <br />
            <span className="text-gradient-primary">Ali</span>
          </h1>
          <div className="font-mono text-lg md:text-xl text-muted-foreground mb-6 h-8">
            <span className="text-primary">{">"}</span> {text}
            <span className="terminal-cursor" />
          </div>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Building robust web applications with Python, Go, Rails, Flask, TypeScript & React.
            MS Computer Science student at the University of Iceland, passionate about clean code and scalable architectures.
          </p>
          <div className="flex gap-4 mb-8">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">view_projects()</a>
            </Button>
            <Button variant="terminal" size="lg" asChild>
              <a href="#contact">contact_me()</a>
            </Button>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/zaahidali" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/zaahidali/" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={22} />
            </a>
            <a href="mailto:zahid4317@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:flex justify-center"
        >
          <div className="relative">
            <div className="w-72 h-72 rounded-lg overflow-hidden border-2 border-primary/30 animate-glow-pulse">
              <img src={profileImg} alt="Zahid Ali" className="w-full h-full object-cover" />
            </div>
            {/* Decorative terminal box */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-md px-4 py-3 font-mono text-xs">
              <span className="text-primary">$</span> <span className="text-muted-foreground">status:</span> <span className="text-primary">available</span>
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#experience" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
};

export default HeroSection;
