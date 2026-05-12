import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blaise Sebagabo — A Quiet Chronicle",
  description: "Websites, mobile apps, and quiet consulting work for churches, parachurch ministries, and faith-based nonprofits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
