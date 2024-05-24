'use client'

import Link from "next/link"
import style from "../ui/home.module.css"

export default function Home({ idUser }: { idUser: number }) {
  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>Bienvenido a 2PEOPLES</h1>
        <p className={style.par}>Aquí encontrarás una vasta variedad de actividades diseñadas para todos
          los gustos y edades, desde conciertos vibrantes y festivales culturales,
          hasta talleres de arte, ferias gastronómicas y eventos deportivos.</p>
        <div className={style.linksContainer}>
          {idUser !== 0 ? <Link href="/events/create" className={style.link}>Create a event</Link> : <Link href="/login" className={style.link}>Login</Link>}
          {idUser !== 0 ? <Link href="/events" className={style.link}>See events</Link> : <Link href="/register" className={style.link}>Register</Link>}
        </div>
      </div>
    </div>
  )
}