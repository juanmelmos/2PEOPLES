'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/login-register.module.css"
import { register } from "../../lib/actions";
import Link from "next/link";

export default function Register() {
  return (
    <div className={style.container}>
      <div className={style.formBox}>
        <h2 className={style.headerForm}>Register</h2>
        <form action={register}>
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
        <p>I have an account, <Link href="/login" className={style.link}>log in</Link></p>
      </div>
    </div>
  );
}