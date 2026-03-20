import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jeet Lohar | Full Stack Developer",
    template: "%s | Jeet Lohar",
  },
  description: "Personal portfolio of Jeet Lohar, a Full Stack Developer specializing in modern web applications, UI/UX, and AI integrations.",
  keywords: ["Jeet Lohar", "Portfolio", "Full Stack Developer", "Software Engineer", "React", "Next.js"],
  authors: [{ name: "Jeet Lohar" }],
  creator: "Jeet Lohar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jeetlohar.dev",
    title: "Jeet Lohar | Full Stack Developer",
    description: "Personal portfolio of Jeet Lohar, a Full Stack Developer.",
    siteName: "Jeet Lohar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Lohar | Full Stack Developer",
    description: "Personal portfolio of Jeet Lohar.",
    creator: "@jeet_lohar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
