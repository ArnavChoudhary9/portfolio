"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const tabs = [
  { label: "ROOT", href: "/#home", icon: "home", section: "home" },
  { label: "DOCS", href: "/#about", icon: "description", section: "about" },
  { label: "SRC", href: "/#projects", icon: "folder_open", section: "projects" },
  { label: "LOG", href: "/blog", icon: "article", section: "log" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onBlog = pathname?.startsWith("/blog") ?? false;
  const active = useActiveSection(onHome ? tabs.map((t) => t.section) : []);

  const isActive = (t: (typeof tabs)[number]) => {
    if (t.section === "log") return onBlog;
    if (!onHome) return false;
    return active === t.section;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-[1000] flex justify-around items-stretch h-16 px-gutter bg-surface/85 backdrop-blur-md border-t border-white/10">
      {tabs.map((t) => {
        const a = isActive(t);
        return (
          <Link
            key={t.label}
            href={t.href}
            aria-current={a ? "page" : undefined}
            className="relative flex flex-col items-center justify-center pt-1 w-full transition-colors text-on-surface-variant hover:text-primary"
          >
            <span
              aria-hidden
              className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ease-in-out-expo ${
                a ? "w-8 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <span
              className={`material-symbols-outlined text-[22px] transition-colors ${
                a ? "text-primary" : ""
              }`}
              style={a ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {t.icon}
            </span>
            <span
              className={`font-mono text-[11px] mt-1 transition-colors ${a ? "text-primary" : ""}`}
            >
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
