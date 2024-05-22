import Link from "next/link"
import style from "../ui/home.module.css"
import { getId } from "../lib/data";

export default function Home() {

console.log(getId());
const logged = getId() !== 0;
console.log(logged);


  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>Bienvenido a 2PEOPLES</h1>
        <p className={style.par}>Aquí encontrarás una vasta variedad de actividades diseñadas para todos
          los gustos y edades, desde conciertos vibrantes y festivales culturales,
          hasta talleres de arte, ferias gastronómicas y eventos deportivos.</p>
          {logged ? <Link href="/events/create">Create a event</Link> : <Link href="/login">Login</Link>}
          {logged ? <Link href="/events">See events</Link> : <Link href="/register">Register</Link>}
          
      </div>
    </div>
  )
}