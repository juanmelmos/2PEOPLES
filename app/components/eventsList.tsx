import { sql } from "@vercel/postgres";
import Image from "next/image";
import style from "../ui/events.module.css";

interface Event {
  foto: string;
  descripcion: string;
  nombre: string;
  ubicacion: string;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <>
      {events.map((event, index) => (
        <div key={index} className={style.event}>
          <div className={style.imageContainer}>
            <Image
              src={event.foto}
              alt={event.descripcion}
              width={300}
              height={200}
            />
            <div className={style.overlay}>
              <h2 className={style.eventTitle}>{event.nombre}</h2>
              <div className={style.overlayContent}>
                <p>{event.descripcion}</p>
                <p>Ubication: {event.ubicacion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
