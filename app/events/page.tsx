import Link from "next/link";
import Events from "../components/events";
import style from "../ui/events.module.css";
import { getId } from "../lib/data";

export default function EventsPage() {

  const logged = getId() !== 0;

  return (
    <>
    <header className={style.header}>
    <h1 className={style.h1}>Explore events</h1>
    {logged ? <Link href="/events/create" className={style.link}>Create a event</Link> : null}
    </header>
    <main className={style.main}>
      <Events/>
    </main>
    </>
  );
}