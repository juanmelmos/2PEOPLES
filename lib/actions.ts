'use server'

import { sql } from "@vercel/postgres";
import { getId } from "./data";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = process.env.JWT_SECRET;

// test

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  token?: string;
  message?: string;
}

function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// login

export async function checkLogin(formData: FormData): Promise<LoginResponse> {
  const user = formData.get('user')?.toString();
  const password = formData.get('password')?.toString();

  if (!user || !password) {
    return { success: false, message: 'Missing user or password' };
  }

  const normalizedUser = normalizeText(user);
  console.log(normalizedUser)

  const { rows } = await sql`SELECT * FROM Users WHERE username=${normalizedUser}`;
  const userRecord = rows[0];

  if (userRecord && bcrypt.compareSync(password, userRecord.password)) {
    if (secret) {
      const token = jwt.sign({ id: userRecord.id, username: userRecord.username, isAdmin: userRecord.admin }, secret, { expiresIn: '1h' });
      return { success: true, token };
    } else {
      return { success: false, message: 'JWT secret is not defined' };
    }
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
}

// register

export async function registerUser(formData: FormData): Promise<RegisterResponse> {
  const user = formData.get('user')?.toString();
  const password = formData.get('password')?.toString();

  if (!user || !password) {
    return { success: false, message: 'Missing user or password' };
  }

  const normalizedUser = normalizeText(user);

  const hashedPassword = bcrypt.hashSync(password, 10);
  const { rows } = await sql`SELECT * FROM Users WHERE username=${normalizedUser}`;

  if (rows.length === 0) {
    if (secret) {
      await sql`INSERT INTO Users (username, password, admin) VALUES (${normalizedUser}, ${hashedPassword}, false)`;
      const { rows: newUserRows } = await sql`SELECT * FROM Users WHERE username=${normalizedUser}`;
      const newUserRecord = newUserRows[0];
      const token = jwt.sign({ id: newUserRecord.id, username: newUserRecord.username, isAdmin: newUserRecord.admin }, secret, { expiresIn: '1h' });
      return { success: true, token };
    } else {
      return { success: false, message: 'JWT secret is not defined' };
    }
  } else {
    return { success: false, message: 'User already exists' };
  }
}

export async function logOut() {
  return { success: true };
}



// importante, la información alojada aquí no se ejecutan ni se envian al
// cliente

//iniciar sesion

// export async function checkLogin(formdata: FormData) {
//   const rawFormData = {
//     user: formdata.get('user'),
//     password: formdata.get('password')
//   };
//   console.log(rawFormData.user, rawFormData.password);

//   const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()} and password=${rawFormData.password?.toString()};`;
//   if (rows.length === 0) {
//     redirect('/login/failLogin');
//   } else {
//     const id = rows.at(0)?.id;
//     setId(id);
//     setIdUserActual(id);
//     revalidatePath('/');
//     revalidatePath('/events');
//     redirect('/');
//   }
// }

// //registrarse

// export async function register(formdata: FormData) {
//   const rawFormData = {
//     user: formdata.get('user'),
//     password: formdata.get('password')
//   };
//   console.log(rawFormData.user, rawFormData.password);

//   const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()};`;
//   if (rows.length === 0) {
//     await sql`INSERT INTO usuarios (username, password) VALUES (${rawFormData.user?.toString()}, ${rawFormData.password?.toString()});`;
//     const { rows } = await sql`SELECT id FROM usuarios where username=${rawFormData.user?.toString()} and password=${rawFormData.password?.toString()};`;
//     const id = rows.at(0)?.id;
//     setId(id);
//     setIdUserActual(id);
//     revalidatePath('/');
//     revalidatePath('/events');
//     redirect('/');
//   } else {
//     redirect('/register/failRegister');
//   }
// }


// //desloggearse

// export async function logOut() {
//   setIdUserActual(0);
//   revalidatePath('/')
//   revalidatePath('/events')
//   redirect('/')
// }

//crear un evento

export async function createEvent(formdata: FormData) {
  const rawFormData = {
    name: formdata.get('name'),
    description: formdata.get('description'),
    image: formdata.get('image'),
    ubication: formdata.get('ubication')
  };

  const { rows } = await sql`SELECT id FROM eventos where nombre=${rawFormData.name?.toString()} and descripcion=${rawFormData.description?.toString()} and ubicacion=${rawFormData.ubication?.toString()};`;
  if (!rows || rows.length === 0) {
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

export async function setIdUserActual(id: number) {
  await sql`UPDATE idUser SET valor = ${id} WHERE id = 0;`;
}

export async function getIdUserActual() {
  const { rows } = await sql`SELECT valor FROM idUser where id=0;`;
  return rows.at(0)?.valor;
}