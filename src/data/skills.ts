import * as skillIcons from "@/assets/skill-icons";

export type SkillItem = {
  label: string;
  icon: string;
};

export type SkillCategory = {
  title: string;
  accent: string;
  skills: SkillItem[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    accent: "from-primary to-primary/60",
    skills: [
      { label: "Go", icon: skillIcons.go },
      { label: "Ruby", icon: skillIcons.ruby },
      { label: "Python", icon: skillIcons.python },
      { label: "TypeScript / JavaScript", icon: skillIcons.typescript },
      { label: "SQL", icon: skillIcons.postgresql },
      { label: "JSL (JMP Scripting)", icon: skillIcons.jsl },
    ],
  },
  {
    title: "Frameworks & Libraries",
    accent: "from-primary/80 to-primary/40",
    skills: [
      { label: "Ruby on Rails", icon: skillIcons.ruby },
      { label: "React", icon: skillIcons.react },
      { label: "Flask", icon: skillIcons.python },
      { label: "deck.gl", icon: skillIcons.deckGl },
      { label: "Svelte", icon: skillIcons.svelte },
      { label: "FastAPI", icon: skillIcons.python },
    ],
  },
  {
    title: "Tools & Data",
    accent: "from-primary/60 to-primary/30",
    skills: [
      { label: "Git / GitHub", icon: skillIcons.git },
      { label: "Docker", icon: skillIcons.docker },
      { label: "PostgreSQL", icon: skillIcons.postgresql },
      { label: "SQLite", icon: skillIcons.postgresql },
      { label: "JMP / JMP Pro", icon: skillIcons.jmp },
    ],
  },
];
