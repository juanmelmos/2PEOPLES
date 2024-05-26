'use server'

import { sql } from "@vercel/postgres";
import { setId } from "./data";
import { getId } from "./data";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// importante, la información alojada aquí no se ejecutan ni se envian al
// cliente

//iniciar sesion

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
    setIdUserActual(id);
    revalidatePath('/')
    redirect('/');
  }
}

//registrarse

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
    revalidatePath('/')
    redirect('/');
  } else {
    redirect('/register/failRegister');
  }
}

//desloggearse

export async function logOut() {
  await sql`UPDATE idUser SET valor = 0 WHERE id = 0;`;
  revalidatePath('/')
  revalidatePath('/events')
}

//crear un evento

export async function createEvent(formdata: FormData) {
  const rawFormData = {
    name: formdata.get('name'),
    description: formdata.get('description'),
    image: formdata.get('image'),
    ubication: formdata.get('ubication')
  };

  const { rows } = await sql`SELECT id FROM eventos where nombre=${rawFormData.name?.toString()} and descripcion=${rawFormData.description?.toString()} and ubicacion=${rawFormData.ubication?.toString()};`;
  if (rows.length === 0) {
    console.log(getId());
    await sql`INSERT INTO eventos (nombre, descripcion, foto, ubicacion) VALUES (${rawFormData.name?.toString()}, ${rawFormData.description?.toString()}, ${rawFormData.image?.toString()}, ${rawFormData.ubication?.toString()});`;
    revalidatePath('/events');
    redirect('/events');
  } else {
    redirect('/events/create/createError');
  }
}

// eliminar un evento

export async function deleteEvent(formdata: FormData) {
  const rawFormData = {
    id: formdata.get('eventId')
  };
    await sql`DELETE FROM eventos WHERE id= ${rawFormData.id?.toString()};`;
    revalidatePath('/events');
    redirect('/events');
}

//Hacer un set en la base de datos donde esta guardado el id del usuario actual
//(esto no es lo más óptimo pero no pude solucionar el cambio en el archivo data
//y he encontrado esta solución temporal). He sacrificado tiempo de ejecución
//para llegar a los mínimos.

export async function setIdUserActual(id:number) {
  await sql`UPDATE idUser SET valor = ${id} WHERE id = 0;`;
}

export async function getIdUserActual() {
  const { rows } = await sql`SELECT valor FROM idUser where id=0;`;
  return rows.at(0).valor;
}