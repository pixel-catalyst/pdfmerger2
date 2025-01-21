import type { Metadata } from "next";
import { Geist, Geist_Mono, Iceberg } from "next/font/google"; // Import Iceberg font
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iceberg = Iceberg({ // Add Iceberg font with weight
  variable: "--font-iceberg",
  subsets: ["latin"],
  weight: "400", // Set weight
});

export const metadata: Metadata = {
  title: "Ashwin's PDF Merger",
  description: "Merges multiple or Split single PDF to multiple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${iceberg.variable} antialiased`} // Include Iceberg font
      >
        {children}
      </body>
    </html>
  );
}
