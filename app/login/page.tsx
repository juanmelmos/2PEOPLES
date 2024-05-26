'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/login-register.module.css"
import { checkLogin } from "../../lib/actions";
import Link from "next/link";

export default function Login() {

  return (
    <div>
      <h2>Login</h2>
    <form action={checkLogin}>
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
    </form>
    <p>I don't have an account, <Link href="/register" className={style.link}>register</Link></p>
    </div>
  );
}