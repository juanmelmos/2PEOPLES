'use client'

import Image from "next/image";
import Link from "next/link";
import style from "../ui/sidebar.module.css";
import styleHeader from "../ui/page.module.css";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "@/lib/actions";
import { useEffect, useState } from 'react';
import { useAuth } from "../context/authContext";
import { revalidatePath } from "next/cache";
import logout from "../api/logout";

//test

export default function Sidebar() {
  const [idUser, setIdUser] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])) as { id: number, isAdmin: boolean };
      setIdUser(payload.id);
      setIsAdmin(payload.isAdmin);
    }
  }, [isAuthenticated]);;

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await fetch('/api/logout', { method: 'POST' });
    setIdUser(0);
    setIsAdmin(false);
    logout();
    router.push('/')
    router.refresh();
  };

  return (
    <header className={styleHeader.sidebar}>
      <div className={style.logoContainer}>
        <Image
          className={style.logo}
          src="/logo.png"
          alt="Logo 2PEOPLES"
          width={120}
          height={120}
        />
      </div>
      <nav className={style.nav}>
        <ul className={style.list}>
          <li>
            <Link href="/" className={`${pathname === '/' ? style.here : style.nothere} ${style.link}`}>Home</Link>
          </li>
          <li>
            <Link href="/events" className={`${pathname === '/events' ? style.here : style.nothere} ${style.link}`}>Events</Link>
          </li>
        </ul>
        {isAdmin && (
          <Link href="/admin" className={`${pathname === '/admin' ? style.here : style.nothere} ${style.link}`}>Managing events</Link>
        )}
        {idUser !== 0 ? (
          <button onClick={handleLogout} className={style.logOut}>Log Out</button>
        ) : (
          <Link href="/login" className={`${pathname === '/login' ? style.here : style.nothere} ${style.link}`}>Log In</Link>
        )}
      </nav>
    </header>
  );
}

// //real

// export default function Sidebar({ idUser }: { idUser: number }) {


//   const pathname = usePathname();
//   return (
//     <header className={styleHeader.sidebar}>
//       <div className={style.logoContainer}>
//       <Image
//       className={style.logo}
//         src="/logo.png"
//         alt="Logo 2PEOPLES"
//         width={120}
//         height={120}
//       />
//       </div>
//       <nav>
//         <ul>
//           <li><Link
//             href="/"
//             className={`${pathname === '/' ? style.here : style.nothere} ${style.link}`}
//           >Home</Link></li>
//           <li><Link
//             href="/events"
//             className={`${pathname === '/events' ? style.here : style.nothere} ${style.link}`}
//           >Events</Link></li>
//         </ul>
//         {idUser === 1 ?
//         <Link
//         href="/admin"
//         className={`${pathname === '/admin' ? style.here : style.nothere} ${style.link}`}
//       >Managing events</Link> : null}
//         {idUser !== 0 ?
//         <form action={logOut}>
//           <button type="submit" className={style.logOut}>LogOut</button>
//         </form> : 
//         <Link
//           href="/login"
//           className={`${pathname === '/login' ? style.here : style.nothere} ${style.link}`}
//         >Log In</Link>}
//       </nav>
//     </header>
//   )
// }