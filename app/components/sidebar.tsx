'use client'

import Image from "next/image";
import Link from "next/link";
import style from "../ui/sidebar.module.css";
import styleHeader from "../ui/page.module.css";
import { usePathname } from "next/navigation";
import { getId } from "../../lib/data";
import { logOut } from "@/lib/actions";


export default function Sidebar({ idUser }: { idUser: number }) {


  // const logged = getId() !== 0;


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
            href="/"
            className={`${pathname === '/' ? style.here : style.nothere}`}
          >Home</Link></li>
          <li><Link
            href="/events"
            className={`${pathname === '/events' ? style.here : style.nothere}`}
          >Events</Link></li>
        </ul>
        {idUser !== 0 ? 
        <form action={logOut}>
          <button type="submit">LogOut</button>
        </form> : 
        <Link
          href="/login"
          className={`${pathname === '/login' ? style.here : style.nothere}`}
        >Log In</Link>}
      </nav>
    </header>
  )
}