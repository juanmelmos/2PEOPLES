'use client'

import { useState } from "react";
import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/page.module.css"
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import checkLogin from "../lib/actions";

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useDebouncedCallback((user:string) => {
    console.log(user)
  },500)

  return (
    <div>
    <form action={checkLogin}>
      <label>
        Username:
        <input type="text" name="user" onChange={(event) => handleSubmit(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
}