import Link from "next/link";
import style from "../ui/login-register.module.css";

export default function EventError() {
  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>Error to create this event</h1>
        <div className={style.linksContainer}>
          <Link href="/events/create" className={style.link}>Try again</Link>
          <Link href="/events" className={style.link}>Events</Link>
        </div>
      </div>
    </div>
  )
}