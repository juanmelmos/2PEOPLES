'use server'

import { sql } from "@vercel/postgres";
import { setId } from "../lib/data";
import { getId } from "../lib/data";

// importante, la información alojada aquí no se ejecutan ni se envian al
// cliente

export default async function checkLogin(formdata: FormData) {
  console.log('checkuser', formdata.get('user'))
  const rawFormData = {
    user: formdata.get('user'),
    password: formdata.get('password')
  };
  console.log(rawFormData.user, rawFormData.password);

  const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()} and password=${rawFormData.password?.toString()};`;
  if (rows.length === 0) {
    return console.log('no existe o no es asi');
  } else {
    const id = rows.at(0).id;
    setId(id);
    console.log(getId());
    return console.log('existe');
  }
}