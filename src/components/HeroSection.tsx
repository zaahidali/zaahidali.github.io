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

      <div className="max-w-6xl mx-auto w-full grid gap-10 md:grid-cols-2 md:gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="order-2 flex justify-center pb-6 md:order-2 md:justify-end md:pb-0"
        >
          <div className="relative">
            <div className="h-44 w-44 overflow-hidden rounded-lg border-2 border-primary/30 animate-glow-pulse sm:h-56 sm:w-56 md:h-72 md:w-72">
              <img src={profileImg} alt="Zahid Ali" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-md border border-border bg-card px-4 py-3 font-mono text-xs md:-bottom-6 md:left-auto md:right-[-1.5rem] md:translate-x-0">
              <span className="text-primary">$</span> <span className="text-muted-foreground">status:</span> <span className="text-primary">available</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="order-1 md:order-1"
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
          <div className="mb-8 max-w-xl rounded-md border border-amber-300/40 bg-amber-400/10 px-4 py-3 shadow-[0_0_24px_rgba(251,191,36,0.08)]">
            <p className="font-mono text-xs text-amber-200">
              {"// portfolio status: still in development"}
            </p>
            <p className="mt-1 text-sm text-amber-50/90">
              Parts of this portfolio, including projects and descriptions, may still be updated and refined.
            </p>
          </div>
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
      </div>

      <a href="#experience" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
};

export default HeroSection;
