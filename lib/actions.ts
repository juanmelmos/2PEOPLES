'use server'

import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// importante, la información alojada aquí no se ejecutan ni se envian al
// cliente

const secret = process.env.JWT_SECRET;

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

interface Event {
  id: number;
  image: string;
  description: string;
  resum: string;
  name: string;
  ubication: string;
  owner: number;
  participants: number[];
  date: string;
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

//crear un evento

export async function createEvent(formdata: FormData) {
  const rawFormData = {
    owner: formdata.get('owner'),
    name: formdata.get('name'),
    resum: formdata.get('resum'),
    description: formdata.get('description'),
    image: formdata.get('image'),
    ubication: formdata.get('ubication'),
    date: formdata.get('date')
  };
  const user = await sql`SELECT username FROM users where id=${rawFormData.owner?.toString()};`;
  const username = user.rows[0].username;

  const { rows } = await sql`SELECT id FROM events where name=${rawFormData.name?.toString()};`;
  if (!rows || rows.length === 0) {
    await sql`INSERT INTO events (name, resum, description, image, ubication, owner, participants, date) VALUES (${rawFormData.name?.toString()}, ${rawFormData.resum?.toString()}, ${rawFormData.description?.toString()}, ${rawFormData.image?.toString()}, ${rawFormData.ubication?.toString()}, ${username?.toString()}, ARRAY[]::integer[], ${rawFormData.date?.toString()});`;
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
  await sql`DELETE FROM events WHERE id= ${rawFormData.id?.toString()};`;
  revalidatePath('/admin');
  revalidatePath('/events');
  redirect('/');
}

// participar en un evento

export async function participate(formdata: FormData) {
  const rawFormData = {
    idUser: formdata.get('idUser'),
    idEvent: formdata.get('idEvent')
  };

  await sql`UPDATE events SET participants = array_append(participants, ${rawFormData.idUser?.toString()}) WHERE id = ${rawFormData.idEvent?.toString()};`;
  revalidatePath('/events')
  console.log(rawFormData.idUser, rawFormData.idEvent)
}

// salir del evento

export async function exitEvent(formdata: FormData) {
  const rawFormData = {
    idUser: formdata.get('idUser'),
    idEvent: formdata.get('idEvent')
  };

  await sql`UPDATE events SET participants = array_remove(participants, ${rawFormData.idUser?.toString()}) WHERE id = ${rawFormData.idEvent?.toString()};`;
  revalidatePath('/events')
  console.log(rawFormData.idUser, rawFormData.idEvent)
}

// comprobar si el evento es mio

export async function isMine(username:string, idUser:number) {
  
  const { rows } = await sql`SELECT * FROM users where id=${idUser} and username=${username};`;
  if (!rows || rows.length === 0) {
    return false;
  } else {
    return true;
  }
  
}

// editar un evento

export async function editEvent(event: Event) {

  await sql`UPDATE events SET name=${event.name}, resum=${event.resum}, description=${event.description}, image=${event.image}, ubication=${event.ubication}, date=${event.date} WHERE id = ${event.id};`;

}