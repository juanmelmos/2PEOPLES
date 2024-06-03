import EventsHeader from "../components/eventsComponent";
import EventsList from "../components/eventsList";
import style from "../ui/events.module.css";
import { sql } from "@vercel/postgres";

interface EventsPageProps {
  searchParams: { [key: string]: string | string[] };
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
}

export default async function Page({ searchParams }: EventsPageProps) {
  const searchQuery = typeof searchParams.search === 'string' ? searchParams.search : '';
  const query = searchQuery 
    ? sql`SELECT * FROM events WHERE nombre ILIKE ${'%' + searchQuery + '%'};`
    : sql`SELECT * FROM events;`;

  const { rows } = await query;

  const events: Event[] = rows.map(row => ({
    id: row.id,
    image: row.image,
    description: row.description,
    resum: row.resum,
    name: row.name,
    ubication: row.ubication,
    owner: row.owner,
    participants: row.participants
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