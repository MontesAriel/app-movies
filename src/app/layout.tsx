import type { Metadata } from "next";
import "./globals.css";
import { monstserrat } from "./ui/fonts";
import ProviderMovie from "@/store/ProviderMovie";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";


export const metadata: Metadata = {
  title: "App peliculas",
  description: "app peliculas con nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProviderMovie>
        <body className={`${monstserrat.className} antialiased`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </ProviderMovie>
    </html>
  );
}
