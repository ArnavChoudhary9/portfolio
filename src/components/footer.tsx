import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const stack = ["VULKAN_SDK", "RUST_STABLE", "C++20", "NEXT.JS"];

const socials = [
  {
    href: "https://github.com/ArnavChoudhary9/",
    label: "GitHub",
    Icon: FaGithub,
    color: "hover:text-primary",
  },
  {
    href: "https://linkedin.com/in/arnav-choudhary-017892322",
    label: "LinkedIn",
    Icon: FaLinkedin,
    color: "hover:text-primary",
  },
  {
    href: "https://www.instagram.com/arnavchoudhary.69",
    label: "Instagram",
    Icon: FaInstagram,
    color: "hover:text-tertiary",
  },
  {
    href: "https://www.youtube.com/@photon1310",
    label: "YouTube",
    Icon: FaYoutube,
    color: "hover:text-error",
  },
];

const Footer = () => (
  <footer className="w-full px-margin-mobile md:px-margin-desktop py-6 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest border-t border-white/5">
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] text-secondary">
        © {new Date().getFullYear()} ENGINE_CORE // STABLE_BUILD
      </span>
    </div>

    <div className="flex items-center gap-4">
      {socials.map(({ href, label, Icon, color }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`text-on-surface-variant ${color} transition-colors`}
        >
          <Icon className="h-4 w-4" />
        </Link>
      ))}
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      {stack.map((s) => (
        <span
          key={s}
          className="font-mono text-[11px] text-on-surface-variant hover:text-secondary transition-colors"
        >
          {s}
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
