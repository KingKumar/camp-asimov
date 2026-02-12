import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Camp Asimov: Robotics & Maker Summer Camp",
  description: "Build robots, code, and create your future at Camp Asimov. Summer robotics & maker camp for ages 10–17.",
  keywords: [
    "LA robotics camp",
    "summer STEM Los Angeles",
    "robotics classes for kids",
    "Camp Asimov",
    "STEM education LA",
    "robotics summer program"
  ],
  openGraph: {
    title: "Camp Asimov: LA’s Robotics & Maker Summer Camp",
    description:
      "3-week intensive with CAD, goBilda, coding, and a family scrimmage showcase. Ages 10–17.",
    url: "https://www.campasimov.com",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
