import type { Metadata } from "next";
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://duseb.pro";
const TITLE = "Blaise Sebagabo — Developer for Churches & Ministries";
const DESCRIPTION =
  "Blaise Sebagabo — developer and designer in Alberta, Canada. Websites, mobile apps, and quiet consulting for churches, ministries, and faith-based nonprofits.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Duseb",
  authors: [{ name: "Blaise Sebagabo", url: SITE_URL }],
  creator: "Blaise Sebagabo",
  publisher: "Blaise Sebagabo",
  keywords: [
    "Blaise Sebagabo",
    "Duseb",
    "church website developer",
    "ministry app developer",
    "Alberta web developer",
    "Next.js developer",
    "React Native developer",
    "Christian software",
    "SDA Kinyarwanda Hymnal",
  ],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Duseb",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@blaise",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Blaise Sebagabo",
      jobTitle: "Developer · Designer · Consultant",
      url: SITE_URL,
      email: "mailto:hello@sebagabo.dev",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Alberta",
        addressCountry: "CA",
      },
      sameAs: ["https://github.com/blaiseAI"],
      knowsAbout: [
        "Next.js",
        "React",
        "React Native",
        "TypeScript",
        "UI/UX Design",
        "Web Development",
        "Mobile Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "SoftwareApplication",
      name: "SDA Kinyarwanda Hymnal",
      applicationCategory: "Religion",
      operatingSystem: "iOS, Android, Web",
      url: "https://sda-kinyarwanda-hymnal.vercel.app/",
      author: { "@id": `${SITE_URL}/#person` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
