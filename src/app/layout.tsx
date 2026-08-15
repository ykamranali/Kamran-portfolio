import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AICursor } from "@/components/ai-cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamran Ali | AI Systems Architect & Cyber Security Consultant",
  description: "The digital mind of Kamran Ali. Explore projects in AI, Cyber Security, Cloud, and Automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#FFFFFF] selection:bg-[#00E5FF]/30 overflow-hidden m-0 p-0">
        <AICursor />
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange={false}>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
