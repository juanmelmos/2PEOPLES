import Events from "../components/eventsComponent";
import EventsList from "../components/eventsList";
import style from "../ui/events.module.css";


export default async function ServerEvents() {

  return (
  <>
  <Events/> 
  <main className={style.main}>
      <EventsList/>
    </main>
  </>
  );
}