import Link from "next/link";
import style from "../ui/login-register.module.css";

export default function LoginFail() {
  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>User or password incorrect</h1>
        <div className={style.linksContainer}>
          <Link href="/login" className={style.link}>Try again</Link>
          <Link href="/register" className={style.link}>Register</Link>
        </div>
      </div>
    </div>
  )
}