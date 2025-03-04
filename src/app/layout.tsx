import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/components/navbar'
import Background from '@/components/background';
import Footer from "@/components/footer";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arnav Choudhary",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Background />

        <div className="flex flex-col min-h-screen">

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </div>

      </body>
    </html>
  );
}
