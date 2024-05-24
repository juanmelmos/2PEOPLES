import { getIdUserActual } from "../../lib/actions";
import Events from "../components/eventsComponent";
import EventsList from "../components/eventsList";
import style from "../ui/events.module.css";


export default async function ServerEvents() {
  const idUser = await getIdUserActual();

  return (
  <>
  <Events idUser={idUser} /> 
  <main className={style.main}>
      <EventsList/>
    </main>
  </>
  );
}