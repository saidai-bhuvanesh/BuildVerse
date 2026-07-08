import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BuildVerse - Open-Source Showcase",
  description: "An open-source ecosystem to submit, discover, and collaborate on projects.",
  keywords: ["open-source", "projects", "portfolio", "developers", "collaboration"],
  openGraph: {
    title: "BuildVerse - Open-Source Showcase",
    description: "An open-source ecosystem to submit, discover, and collaborate on projects.",
    type: "website",
    siteName: "BuildVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildVerse - Open-Source Showcase",
    description: "An open-source ecosystem to submit, discover, and collaborate on projects.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" tabIndex="-1" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
