import Eventos from "../../components/events";
import style from "../../ui/events.module.css";

export default function Events() {

  return (
    <>
    <h1>Explore events</h1>
    <main className={style.main}>
      <Eventos/>
    </main>
    </>
  );
}