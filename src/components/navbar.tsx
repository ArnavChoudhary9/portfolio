"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { label: "ROOT", href: "/#home", section: "home" },
  { label: "DOCS", href: "/#about", section: "about" },
  { label: "SRC", href: "/#projects", section: "projects" },
  { label: "LOG", href: "/blog", section: "log" },
];

const Navbar = () => {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onBlog = pathname?.startsWith("/blog") ?? false;

  const active = useActiveSection(
    onHome ? links.map((l) => l.section) : []
  );

  const isActive = (link: (typeof links)[number]) => {
    if (link.section === "log") return onBlog;
    if (!onHome) return false;
    return active === link.section;
  };

  return (
    <nav className="fixed top-0 w-full z-[1000] flex justify-between items-center px-gutter h-12 bg-surface/80 backdrop-blur-md border-b border-white/10 transition-all duration-150 ease-in-out-expo">
      <Link
        href="/#home"
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <span className="material-symbols-outlined text-base leading-none">memory</span>
        <span className="font-mono text-[11px] font-bold tracking-tighter">
          ENGINE_CORE::PORTFOLIO
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-2">
        {links.map((l) => {
          const active = isActive(l);
          return (
            <Link
              key={l.label}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative font-mono text-[11px] tracking-wider px-3 py-1.5 transition-colors duration-150 ${
                active ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {l.label}
              <span
                aria-hidden
                className={`absolute left-3 right-3 -bottom-px h-px bg-primary transition-all duration-300 ease-in-out-expo ${
                  active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
                style={{ transformOrigin: "center" }}
              />
            </Link>
          );
        })}
      </div>

      <Link
        href="https://github.com/ArnavChoudhary9"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub source"
        className="text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-base leading-none">terminal</span>
      </Link>
    </nav>
  );
};

export default Navbar;
