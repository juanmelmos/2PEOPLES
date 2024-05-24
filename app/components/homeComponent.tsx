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
          {idUser !== 0 ? <Link href="/events/create">Create a event</Link> : <Link href="/login">Login</Link>}
          {idUser !== 0 ? <Link href="/events">See events</Link> : <Link href="/register">Register</Link>}
      </div>
    </div>
  )
}