import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "Alvotech",
    url: "https://www.alvotech.com/",
    role: "Software Engineer",
    period: "2025 – Present",
    location: "Reykjavik, Iceland",
    points: [
      "Developing internal scripting tools and add-ins for data analysis and visualization in a pharmaceutical environment.",
      "Building configurable reporting and plotting systems driven by external configuration files.",
      "Refactoring and modularizing large legacy codebases to improve maintainability and scalability.",
      "Designing interactive data filtering interfaces for large-scale datasets.",
    ],
  },
  {
    company: "CodingCops",
    url: "https://codingcops.com/",
    role: "Full Stack Software Engineer",
    points: [
      "Built and maintained production web applications across front-end and back-end.",
      "Implemented automated testing pipelines, significantly reducing defect rates.",
      "Developed interactive, responsive user interfaces with modern frameworks.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-3xl font-bold mb-2">
            <span className="text-primary">#</span> experience
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-10" />
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
            >
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              <div className="p-6 md:p-8 pl-8 md:pl-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-lg text-foreground leading-tight">
                        {exp.role}
                      </h3>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-sm text-primary hover:underline mt-0.5"
                      >
                        @{exp.company}
                        <ExternalLink size={11} />
                      </a>
                      {exp.location && (
                        <p className="font-mono text-xs text-muted-foreground mt-0.5">{exp.location}</p>
                      )}
                    </div>
                  </div>
                  {exp.period && (
                    <span className="font-mono text-xs text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                      {exp.period}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  {exp.points.map((point, i) => (
                    <div key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0 font-mono text-xs">▸</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
