import { sql } from "@vercel/postgres";
import Image from "next/image";
import style from "../ui/events.module.css";


export default async function Events() {

  const { rows } = await sql`SELECT * FROM eventos;`;

  return (
    <>
      {rows.map((row, index) => (
        <div key={index} className={style.event}>
          <div className={style.imageContainer}>
            <Image
              src={row.foto}
              alt={row.descripcion}
              width={300}
              height={200}
            />
            <div className={style.overlay}>
              <h2 className={style.eventTitle}>{row.nombre}</h2>
              <div className={style.overlayContent}>
                <p>{row.descripcion}</p>
                <p>{row.ubicacion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
