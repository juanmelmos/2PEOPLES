import type { Metadata } from "next";
import { Inter } from "next/font/google";
import style from "../ui/page.module.css";
import Sidebar from "../components/sidebar";

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
    <div className={`${inter.className} ${style.page}`}>
      <Sidebar />
      {children}
    </div>
  );
}