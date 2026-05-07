import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Background from "@/components/background";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottomNav";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ENGINE_CORE :: Arnav Choudhary",
  description:
    "Graphics & engine programmer at IIT Delhi. Renderers, ray tracers, physics engines.",
  authors: [{ name: "Arnav Choudhary" }],
  keywords: [
    "graphics programming",
    "ray tracing",
    "vulkan",
    "opengl",
    "game engine",
    "rust",
    "c++",
    "iit delhi",
  ],
  openGraph: {
    title: "ENGINE_CORE :: Arnav Choudhary",
    description: "Graphics & engine programmer at IIT Delhi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Material Symbols is an icon font; next/font does not handle icon fonts. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="font-sans bg-background text-on-background antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary pb-20 md:pb-0">
        <Navbar />
        <Background />

        <main className="flex-grow">{children}</main>

        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
