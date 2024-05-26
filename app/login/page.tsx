'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/login-register.module.css"
import { checkLogin } from "../../lib/actions";
import Link from "next/link";

export default function Login() {

  return (
    <div className={style.container}>
      <div className={style.formBox}>
        <h2 className={style.headerForm}>Login</h2>
        <form action={checkLogin}>
          <label className={style.label}>
            Username:
            <input className={style.input} type="text" name="user" required />
          </label>
          <br />
          <label className={style.label}>
            Password:
            <input className={style.input} type="password" name="password" required />
          </label>
          <br />
          <button className={style.send} type="submit">Send</button>
        </form>
        <p>I don&apos;t have an account, <Link href="/register" className={style.link}>register</Link></p>
      </div>
    </div>
  );
}