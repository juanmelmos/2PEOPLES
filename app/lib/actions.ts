'use server'

import { sql } from "@vercel/postgres";
import { setId } from "../lib/data";
import { getId } from "../lib/data";
import { redirect } from "next/navigation";

// importante, la información alojada aquí no se ejecutan ni se envian al
// cliente

export async function checkLogin(formdata: FormData) {
  const rawFormData = {
    user: formdata.get('user'),
    password: formdata.get('password')
  };
  console.log(rawFormData.user, rawFormData.password);

  const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()} and password=${rawFormData.password?.toString()};`;
  if (rows.length === 0) {
    redirect('/login/failLogin');
  } else {
    const id = rows.at(0).id;
    setId(id);
    redirect('/');
  }
}

export async function register(formdata: FormData) {
  const rawFormData = {
    user: formdata.get('user'),
    password: formdata.get('password')
  };
  console.log(rawFormData.user, rawFormData.password);

  const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()} and password=${rawFormData.password?.toString()};`;
  if (rows.length === 0) {
    await sql`INSERT INTO usuarios (username, password) VALUES (${rawFormData.user?.toString()}, ${rawFormData.password?.toString()});`;
    const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()} and password=${rawFormData.password?.toString()};`;
    const id = rows.at(0).id;
    setId(id);
    redirect('/');
  } else {
    redirect('/register/failRegister');
  }
}

export async function createEvent(formdata: FormData) {
  const rawFormData = {
    name: formdata.get('name'),
    description: formdata.get('description'),
    image: formdata.get('image'),
    ubication: formdata.get('ubication')
  };

  const { rows } = await sql`SELECT id FROM eventos where nombre=${rawFormData.name?.toString()} and descripcion=${rawFormData.description?.toString()} and ubicacion=${rawFormData.ubication?.toString()};`;
  if (rows.length === 0) {
    await sql`INSERT INTO eventos (nombre, descripcion, foto, ubicacion) VALUES (${rawFormData.name?.toString()}, ${rawFormData.description?.toString()}, ${rawFormData.image?.toString()}, ${rawFormData.ubication?.toString()});`;
    redirect('/events')
  } else {
    redirect('/events/create/createError');
  }
}