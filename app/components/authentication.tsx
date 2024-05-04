import style from "../ui/page.module.css"
import "../ui/login.module.css"

export default function Authentication() {
  return (
    <div className={style.page}>
    <h1>Formulario de login</h1>
    <form action="/login" method="post">
        <div>
        </div>
        <div>
        </div>
        <button type="submit">Iniciar sesión</button>
    </form>
    </div>
  )
}