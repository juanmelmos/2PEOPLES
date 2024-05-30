import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import style from "./ui/page.module.css";
import Sidebar from "@/app/serverComponents/serverSidebar";
import { AuthProvider } from './context/authContext';


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
        <AuthProvider>
          <Sidebar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
