'use server'

import { sql } from "@vercel/postgres";
import { setId } from "../lib/data";
import { getId } from "../lib/data";
import { redirect } from "next/navigation";

// importante, la información alojada aquí no se ejecutan ni se envian al
// cliente

export async function checkLogin(formdata: FormData) {
  console.log('checkuser', formdata.get('user'))
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
    console.log(getId());
    redirect('/');
  }
}

export async function register(formdata: FormData) {
  console.log('checkuser', formdata.get('user'))
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