import { motion } from "framer-motion";
import { ExternalLink, Github, Brain, GraduationCap } from "lucide-react";
import projectGanImg from "@/assets/project-gan.jpg";
import projectQuantumImg from "@/assets/project-quantumlearn.jpg";
import SectionHeadingLink from "@/components/SectionHeadingLink";

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  image?: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Text-to-Image GAN",
    description:
      "Deep learning model generating images from textual descriptions using Generative Adversarial Networks. Trained on CUB-200 bird dataset with AttnGAN architecture achieving state-of-the-art FID scores.",
    tags: ["Python", "TensorFlow", "GAN", "Deep Learning"],
    icon: Brain,
    image: projectGanImg,
    link: "https://zaahidali.github.io/projects_details/gan_project4.html",
  },
  {
    title: "QuantumLearn",
    description:
      "Educational platform for quantum computing concepts. Interactive circuit builder and visualization of quantum algorithms.",
    tags: ["Svelte 5", "FastAPI", "Qiskit"],
    icon: GraduationCap,
    image: projectQuantumImg,
    github: "https://github.com/SyedMuhammadAzhar/quantum-learn",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="scroll-mt-24 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 flex flex-wrap items-center gap-3 font-mono text-3xl font-bold">
            <SectionHeadingLink id="projects">
              <span className="text-primary">#</span> projects
            </SectionHeadingLink>
            <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.08)]">
              [placeholder demos, more projects coming]
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon;
            const href = project.link || project.github || "#";
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-[0_0_30px_hsl(142_72%_50%/0.06)]"
                >
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <ProjectIcon size={18} className="text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <Github
                            size={14}
                            className="text-muted-foreground group-hover:text-primary transition-colors"
                          />
                        )}
                        {project.link && (
                          <ExternalLink
                            size={14}
                            className="text-muted-foreground group-hover:text-primary transition-colors"
                          />
                        )}
                      </div>
                    </div>
                    <h3 className="font-mono font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 bg-secondary rounded text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/zaahidali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} /> view_all_on_github()
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
