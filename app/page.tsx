import Image from "next/image";
import styles from "./ui/page.module.css";
import HomePage from "./serverComponents/serverHome";
import Sidebar from "@/app/serverComponents/serverSidebar";

export default function Home() {
  return (
    <>
    <Sidebar/>
    <HomePage/>
    </>
  );
}