'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../../ui/login-register.module.css"
import { createEvent } from "../../lib/actions";

export default function CreateEvent() {

  return (
    <div>
    <form action={createEvent}>
      <label>
        Name:
        <input type="text" name="name"/>
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description"/>
      </label>
      <br />
      <label>
        Image(URL):
        <input type="text" name="image"/>
      </label>
      <br />
      <label>
        Ubication:
        <input type="text" name="ubication"/>
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
}