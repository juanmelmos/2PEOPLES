import Link from "next/link";
import Events from "../components/events";
import style from "../ui/events.module.css";

export default function EventsPage() {

  return (
    <>
    <header className={style.header}>
    <h1 className={style.h1}>Explore events</h1>
    <Link href="/events/create" className={style.link}>Create a event</Link>
    </header>
    <main className={style.main}>
      <Events/>
    </main>
    </>
  );
}