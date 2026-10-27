import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const unica = Outfit({
  variable: "--font-unica",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rules | Mafia Club",
  description:
    "Learn how to play at Mafia Club — an interactive guide to roles, nights, days, voting, and etiquette.",
  openGraph: {
    title: "Rules | Mafia Club",
    description: "Read the rules before your first game.",
    siteName: "Mafia Club",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unica.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
