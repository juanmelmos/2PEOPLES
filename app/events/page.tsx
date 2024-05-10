import Events from "../components/events";
import style from "../ui/events.module.css";

export default function EventsPage() {

  return (
    <>
    <h1>Explore events</h1>
    <main className={style.main}>
      <Events/>
    </main>
    </>
  );
}