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

export const metadata: Metadata = {
  title: "Calcutta Sweets",
  description: "Authentic Bengali Mithai in Raipur",
  icons: {
    icon: "/favicon.svg",
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
