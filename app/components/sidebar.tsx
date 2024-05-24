'use client'

import Image from "next/image";
import Link from "next/link";
import style from "../ui/sidebar.module.css";
import styleHeader from "../ui/page.module.css";
import { usePathname } from "next/navigation";
import { logOut } from "@/lib/actions";


export default function Sidebar({ idUser }: { idUser: number }) {


  const pathname = usePathname();
  return (
    <header className={styleHeader.sidebar}>
      <div className={style.logoContainer}>
      <Image
      className={style.logo}
        src="/logo.png"
        alt="Logo 2PEOPLES"
        width={200}
        height={200}
      />
      </div>
      <nav>
        <ul>
          <li><Link
            href="/"
            className={`${pathname === '/' ? style.here : style.nothere} ${style.link}`}
          >Home</Link></li>
          <li><Link
            href="/events"
            className={`${pathname === '/events' ? style.here : style.nothere} ${style.link}`}
          >Events</Link></li>
        </ul>
        {idUser !== 0 ?
        <form action={logOut}>
          <button type="submit" className={style.logOut}>LogOut</button>
        </form> : 
        <Link
          href="/login"
          className={`${pathname === '/login' ? style.here : style.nothere} ${style.link}`}
        >Log In</Link>}
      </nav>
    </header>
  )
}