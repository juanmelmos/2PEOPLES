'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/login-register.module.css"
import { checkLogin } from "../lib/actions";

export default function Login() {

  return (
    <div>
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
    </div>
  );
}