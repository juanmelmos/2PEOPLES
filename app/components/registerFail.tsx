import Link from "next/link";
import style from "../ui/login-register.module.css";

export default function RegisterFail() {
  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>User exist</h1>
        <div className={style.linksContainer}>
          <Link href="/register" className={style.linkFails}>Try again</Link>
          <Link href="/login" className={style.linkFails}>Login</Link>
        </div>
      </div>
    </div>
  )
}