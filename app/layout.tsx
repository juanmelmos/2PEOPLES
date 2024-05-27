import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import style from "./ui/page.module.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2PEOPLES",
  description: "2PEOPLES App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${style.page}`}>
        {children}
        </body>
    </html>
  );
}
