import EventsHeader from "../components/eventsComponent";
import EventsList from "../components/eventsList";
import style from "../ui/events.module.css";
import { sql } from "@vercel/postgres";

interface EventsPageProps {
  searchParams: { [key: string]: string | string[] };
}

interface Event {
  foto: string;
  descripcion: string;
  nombre: string;
  ubicacion: string;
}

export default async function Page({ searchParams }: EventsPageProps) {
  const searchQuery = typeof searchParams.search === 'string' ? searchParams.search : '';
  const query = searchQuery 
    ? sql`SELECT * FROM eventos WHERE nombre ILIKE ${'%' + searchQuery + '%'};`
    : sql`SELECT * FROM eventos;`;

  const { rows } = await query;

  const events: Event[] = rows.map(row => ({
    foto: row.foto,
    descripcion: row.descripcion,
    nombre: row.nombre,
    ubicacion: row.ubicacion
  }));

  return (
    <>
      <EventsHeader />
      <main className={style.main}>
        <EventsList events={events} />
      </main>
    </>
  );
}