const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">{"<"}</span>
          {" "}Built by Zahid Ali{" "}
          <span className="text-primary">{"/>"}</span>
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
