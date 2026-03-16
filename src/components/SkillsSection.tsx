import { motion } from "framer-motion";
import SectionHeadingLink from "@/components/SectionHeadingLink";
import { skillCategories } from "@/data/skills";

const SkillGlyph = ({
  svg,
  size = 14,
  className,
}: {
  svg: string;
  size?: number;
  className?: string;
}) => {
  const markup = svg
    .replace("<svg ", '<svg width="100%" height="100%" aria-hidden="true" focusable="false" ')
    .replaceAll('fill="#000"', 'fill="currentColor"')
    .replaceAll('stroke="#000"', 'stroke="currentColor"');

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: size, height: size, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="scroll-mt-24 py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-3xl font-bold mb-2">
            <SectionHeadingLink id="skills">
              <span className="text-primary">#</span> skills
            </SectionHeadingLink>
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <h3 className="font-mono text-sm font-semibold text-primary mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/60" />
                {category.title}
              </h3>

              <div className="space-y-2.5">
                {category.skills.map((skill) => {
                  return (
                    <div
                      key={skill.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary/40 border border-border/50 hover:border-primary/30 hover:bg-secondary/70 transition-all cursor-default group/skill"
                    >
                      <div className="w-7 h-7 rounded-md bg-background/60 flex items-center justify-center shrink-0">
                        <SkillGlyph
                          svg={skill.icon}
                          size={14}
                          className="text-muted-foreground group-hover/skill:text-primary transition-colors"
                        />
                      </div>
                      <span className="font-mono text-xs text-foreground/80 group-hover/skill:text-foreground transition-colors">
                        {skill.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
