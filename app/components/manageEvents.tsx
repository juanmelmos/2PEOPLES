import { sql } from "@vercel/postgres";
import Image from "next/image";
import style from "../ui/manageEvents.module.css";
import { deleteEvent } from "@/lib/actions";


export default async function ManageEvents() {

  const { rows } = await sql`SELECT * FROM events ORDER BY date;`;

  return (
    <>
      
        {rows.map((row, index) => (
          <form key={index} action={deleteEvent}>
          <div key={index} className={style.event}>
            <div className={style.eventContent}>
              <div className={style.overlay}>
              <label className={style.label}>ID: <input className={style.input} type="text" value={row.id} name="eventId" readOnly/></label>
                <h2 className={style.eventTitle}>{row.name}</h2>
                <div className={style.overlayContent}>
                  <p>{row.description}</p>
                  <p>{row.ubication}</p>
                </div>
              </div>
              <div className={style.imageContainer}>
                <p><Image
                  src={row.image}
                  alt={row.descritcion}
                  width={300}
                  height={200}
                /></p>
              </div>
              <button className={style.deleteButton} type="submit">Eliminar</button>
            </div>
          </div>
          </form>
        ))}
    </>
  )
}