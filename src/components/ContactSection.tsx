import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, ArrowUpRight, Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionHeadingLink from "@/components/SectionHeadingLink";

const links = [
  {
    label: "GitHub",
    value: "zaahidali",
    href: "https://github.com/zaahidali",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "zaahidali",
    href: "https://www.linkedin.com/in/zaahidali/",
    icon: Linkedin,
  },
];

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    else if (formData.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!emailRegex.test(formData.email.trim())) errs.email = "Enter a valid email address";
    if (!formData.message.trim()) errs.message = "Message is required";
    else if (formData.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...formData, [field]: value };
      const errs: FieldErrors = {};
      if (!updated.name.trim()) errs.name = "Name is required";
      else if (updated.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
      if (!updated.email.trim()) errs.email = "Email is required";
      else if (!emailRegex.test(updated.email.trim())) errs.email = "Enter a valid email address";
      if (!updated.message.trim()) errs.message = "Message is required";
      else if (updated.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
      setErrors(errs);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `New message from ${formData.name.trim()} via portfolio`,
          botcheck: "",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSending(false);
    }
  };

  const fieldError = (field: keyof FieldErrors) =>
    touched[field] && errors[field] ? errors[field] : null;

  return (
    <section id="contact" className="scroll-mt-24 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-3xl font-bold mb-2">
            <SectionHeadingLink id="contact">
              <span className="text-primary">#</span> contact
            </SectionHeadingLink>
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-10" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative bg-card border border-border rounded-xl p-7 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <p className="font-mono text-primary text-sm mb-3">{"// let's connect"}</p>
                <h3 className="font-mono text-xl font-bold text-foreground mb-3">
                  Got a project in mind?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  I'm open to freelance projects, collaborations, and interesting opportunities. Drop me a message or reach out via the links below.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                    <MapPin size={14} className="text-primary" />
                    Reykjavik, Iceland
                  </div>
                  <a
                    href="mailto:zahid4317@gmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground font-mono hover:text-primary transition-colors"
                  >
                    <Mail size={14} className="text-primary" />
                    zahid4317@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.06 }}
                  className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <link.icon size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                      {link.label}
                    </p>
                    <p className="text-sm text-foreground/90 truncate">{link.value}</p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-7 space-y-5"
              noValidate
            >
              <p className="font-mono text-sm text-muted-foreground mb-1">
                {"// send me a message"}
              </p>

              {/* Hidden honeypot for bot protection */}
              <input type="hidden" name="botcheck" value="" />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`bg-background font-mono text-sm transition-colors ${
                      fieldError("name")
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-border"
                    }`}
                    maxLength={100}
                  />
                  <AnimatePresence>
                    {fieldError("name") && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-destructive text-xs font-mono mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle size={12} /> {fieldError("name")}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`bg-background font-mono text-sm transition-colors ${
                      fieldError("email")
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-border"
                    }`}
                    maxLength={255}
                  />
                  <AnimatePresence>
                    {fieldError("email") && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-destructive text-xs font-mono mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle size={12} /> {fieldError("email")}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`bg-background font-mono text-sm min-h-[140px] transition-colors ${
                    fieldError("message")
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-border"
                  }`}
                  maxLength={2000}
                />
                <AnimatePresence>
                  {fieldError("message") && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-destructive text-xs font-mono mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle size={12} /> {fieldError("message")}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full font-mono text-sm gap-2"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </Button>

              {/* Status messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 justify-center text-sm font-mono text-primary"
                  >
                    <CheckCircle2 size={16} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 justify-center text-sm font-mono text-destructive"
                  >
                    <AlertCircle size={16} />
                    Failed to send. Please try again or email me directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
