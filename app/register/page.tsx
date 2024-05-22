'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/page.module.css"
import { register } from "../lib/actions";

export default function Register() {
  return (
    <div>
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
    </form>
    </div>
  );
}