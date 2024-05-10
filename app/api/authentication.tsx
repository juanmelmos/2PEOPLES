'use client'

import "../ui/login.module.css"
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from 'next';
import Data from "../lib/data"
import { usePathname } from "next/navigation";

export function getPath() {
  const path = usePathname().toString;
  return path;
}


const submit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, password } = req.body;
  if (user === '' || password === '') {
    return (
      <p>Falta el usuario o la contraseña</p>
    )
  }
  try {
    let isValidUser = false;
    const { rows } = await sql`SELECT * FROM usuarios;`;
    rows.map(row => {
      if (row.username === user && row.password === password) { 
        isValidUser = true;
        Data(row.id,row.username);
        return
      }
    });
    if (isValidUser) {
      <p>Usuario correcto</p>
    } else {
      <p>Usuario o contraseña incorrecta</p>
    }
    res.status(201).json({ message: 'Datos enviados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar los datos' });
  }
};

export default submit;

// export default async function Authentication(user:String,password:String) {
//   const { rows } = await sql`SELECT * FROM eventos;`;
//   let isValidUser = false;
//   let sentenceVerification;
//   if (rows == null || user === "" || password === ""){
//     window.location.href="/login"
//   } else {
//     for (let i=0 ;i < rows.length && !isValidUser; i++) {
//       if (rows[i].usuario === user && rows[i].contrasena === password){
//         isValidUser = true;
//         sessionStorage.setItem("logged", "true");
//         sessionStorage.setItem("id_evento", rows[i].id);
//         console.log(sessionStorage.getItem('logged'));
//         //window.location.reload();
//         window.location.href="/"+rows[i].tipoEvento+"/events";
//       }
//     }
//   }
//   if (isValidUser) {
//     sentenceVerification = 'Usuario o contraseña incorrecto'
//   } else {
//     sentenceVerification = 'Bienvenido ' + user;
//   }
//   return (
//     <p>{sentenceVerification}</p>
//   )
// }
