import type { Metadata } from "next";
import { DM_Serif_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroSplash from "@/components/ui/IntroSplash";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calcuttasweets.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Calcutta Sweets | Authentic Bengali Mithai & Sweets in Raipur",
    template: "%s | Calcutta Sweets",
  },
  description:
    "Authentic Bengali Mithai, Sondesh, Roshogolla, Kaju Katli & Artisanal Indian Sweets handcrafted in Raipur, Chhattisgarh. Order fresh sweets & custom celebration boxes.",
  keywords: [
    "Calcutta Sweets",
    "Bengali Mithai Raipur",
    "Bengali Sweets Raipur",
    "Roshogolla Raipur",
    "Sondesh Raipur",
    "Indian Sweets Raipur",
    "Tatibandh Sweets",
    "Wedding Sweets Raipur",
    "Mithai Shop Raipur",
  ],
  authors: [{ name: "Calcutta Sweets" }],
  creator: "Calcutta Sweets",
  publisher: "Calcutta Sweets",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Calcutta Sweets | Authentic Bengali Mithai in Raipur",
    description:
      "Handcrafted Bengali Mithai, Sondesh, Roshogolla, & Artisanal Indian Sweets since 2000 in Raipur, Chhattisgarh.",
    siteName: "Calcutta Sweets",
    images: [
      {
        url: "/images/Shop.png",
        width: 1200,
        height: 630,
        alt: "Calcutta Sweets - Authentic Bengali Mithai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcutta Sweets | Authentic Bengali Mithai in Raipur",
    description:
      "Handcrafted Bengali Mithai, Sondesh, Roshogolla, & Artisanal Indian Sweets since 2000 in Raipur, Chhattisgarh.",
    images: ["/images/Shop.png"],
  },
  alternates: {
    canonical: "./",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${siteUrl}/#organization`,
  name: "Calcutta Sweets",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  image: `${siteUrl}/images/Shop.png`,
  description:
    "Bringing legendary authentic Bengali Mithai and artisanal Indian sweets to Raipur, Chhattisgarh since 2000.",
  telephone: "+91 99930 60082",
  email: "calcuttasweets@example.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road, Tatibandh",
    addressLocality: "Raipur",
    addressRegion: "Chhattisgarh",
    postalCode: "492001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.2514,
    longitude: 81.5647,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
  ],
  sameAs: [],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Calcutta Sweets",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body
        className={`${dmSerifDisplay.variable} ${poppins.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <IntroSplash />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
