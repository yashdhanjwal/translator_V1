import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Online Tools by Yash Dhanjwal | Translator & Dictionary",
  description: "Professional, fast, and SEO-optimized free online translator and dictionary tool. Support for 100+ languages, definitions, synonyms, and more.",
  keywords: ["translator", "dictionary", "free tools", "translation", "Yash Dhanjwal", "language tools"],
  authors: [{ name: "Yash Dhanjwal", url: "https://www.yashdhanjwal.com" }],
  openGraph: {
    title: "Free Online Tools by Yash Dhanjwal",
    description: "Fast, minimal and professional translator & dictionary tool.",
    type: "website",
    locale: "en_US",
    url: "https://ft1.yashdhanjwal.com",
    siteName: "Free Online Tools",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
