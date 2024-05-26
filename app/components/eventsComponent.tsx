'use client'

import Link from "next/link";
import style from "../ui/events.module.css";

export default function EventsHeader({ idUser }: { idUser: number }) {

  return (
    <>
    <header className={style.header}>
    <h1 className={style.h1}>Explore events</h1>
    {idUser !== 0 ? <Link href="/events/create" className={style.link}>Create a event</Link> : 
    <p className={style.link}>Log in to create an event</p>}
    </header>
    </>
  );
}