import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Camp Asimov | Robotics Engineering Summer Program | Santa Monica",
  description:
    "A 3-week robotics engineering program where students design, build, and program their own robot. Small cohorts. Santa Monica.",
  keywords: [
    "LA robotics camp",
    "summer STEM Los Angeles",
    "robotics classes for kids",
    "Camp Asimov",
    "STEM education LA",
    "robotics summer program"
  ],
  openGraph: {
    title: "Camp Asimov | Robotics Engineering Summer Program",
    description:
      "Students design, build, and program their own robot in a 3-week small-cohort robotics engineering program in Santa Monica.",
    url: "https://www.campasimov.com",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camp Asimov | Robotics Engineering Summer Program",
    description:
      "Students design, build, and program their own robot in a 3-week small-cohort robotics engineering program in Santa Monica.",
    images: ["/og-image.jpg"],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18036637271"
          strategy="beforeInteractive"
        />
        <Script id="google-ads-gtag" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18036637271');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
