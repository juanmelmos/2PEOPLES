'use client'

import Link from "next/link"
import style from "../ui/home.module.css"

export default function Home({ idUser }: { idUser: number }) {
  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>Welcome to 2PEOPLES!</h1>
        <p className={style.par}>Step into a world of boundless experiences tailored to every taste and age. From electrifying concerts and cultural extravaganzas to immersive art workshops, culinary fairs, and thrilling sporting events, our offerings cater to a diverse spectrum of interests and passions. Whether you're seeking the pulsating rhythms of live music or the savory delights of local cuisine, 2PEOPLES provides a vibrant tapestry of activities to enrich your journey and create lasting memories. Explore, indulge, and immerse yourself in the dynamic tapestry of experiences awaiting you.</p>
        <div className={style.linksContainer}>
          {idUser !== 0 ? <Link href="/events/create" className={style.link}>Create a event</Link> : <Link href="/login" className={style.link}>Login</Link>}
          {idUser !== 0 ? <Link href="/events" className={style.link}>See events</Link> : <Link href="/register" className={style.link}>Register</Link>}
        </div>
      </div>
    </div>
  )
}