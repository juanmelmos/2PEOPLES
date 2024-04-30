'use client'

import Image from "next/image";
import Link from "next/link";
import style from "../ui/sidebar.module.css";
import styleHeader from "../ui/page.module.css";
import { usePathname } from "next/navigation";


export default function Sidebar() {
  const pathname = usePathname();
  return (
    <header className={styleHeader.sidebar}>
      <Image
        src="/logo.png"
        alt="Logo 2PEOPLES"
        width={100}
        height={100}
      />
      <nav>
        <ul>
          <li><Link
            href="/home"
            className={`${pathname === '/home' ? style.here : style.nothere}`}
          >Home</Link></li>
          <li><Link
            href="/events"
            className={`${pathname === '/events' ? style.here : style.nothere}`}
          >Events</Link></li>
          <li><Link
            href="/"
            className={`${pathname === '/' ? style.here : style.nothere}`}
          >Log In</Link></li>
        </ul>
      </nav>
    </header>
  )
}