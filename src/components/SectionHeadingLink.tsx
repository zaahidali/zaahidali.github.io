import type { ReactNode } from "react";

type SectionHeadingLinkProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

const SectionHeadingLink = ({
  id,
  children,
  className = "",
}: SectionHeadingLinkProps) => {
  const classes = [
    "inline-flex items-center gap-2 rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={`#${id}`} aria-label={`Jump to ${id} section`} className={classes}>
      {children}
    </a>
  );
};

export default SectionHeadingLink;
