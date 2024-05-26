'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/page.module.css"
import { register } from "../../lib/actions";
import Link from "next/link";

export default function Register() {
  return (
    <div>
      <h2>Register</h2>
    <form action={register}>
      <label>
        Username:
        <input type="text" name="user" required/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" required/>
      </label>
      <br />
      <button type="submit">Enviar</button>
      <p>I have an account, <Link href="/register" className={style.link}>log in</Link></p>
    </form>
    </div>
  );
}