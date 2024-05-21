import style from "../ui/home.module.css"

export default function Home() {
  return (
    <div className={style.boxOut}>
      <div className={style.boxIn}>
        <h1 className={style.header}>Bienvenido a 2PEOPLES</h1>
        <p className={style.par}>Aquí encontrarás una vasta variedad de actividades diseñadas para todos
          los gustos y edades, desde conciertos vibrantes y festivales culturales,
          hasta talleres de arte, ferias gastronómicas y eventos deportivos.</p>
      </div>
    </div>
  )
}