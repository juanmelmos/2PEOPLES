import { sql } from "@vercel/postgres";
import Image from "next/image";
import style from "../ui/events.module.css";


export default async function Events() {

  const { rows } = await sql`SELECT * FROM eventos;`;
  console.log(rows);

  return (
    <>
      {rows.map((row, index) => (
        <div key={index} className={style.event}><h2>{row.nombre}</h2>
          <p>{row.descripcion}</p>
          <p>{row.ubicacion}</p>
          <Image
            src={row.foto}
            alt={row.descripcion}
            width={300}
            height={200}
          />
        </div>
      ))}
    </>
  )
}
