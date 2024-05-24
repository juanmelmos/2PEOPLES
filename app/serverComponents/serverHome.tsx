import { getIdUserActual } from "../../lib/actions";
import Home from "../components/homeComponent";

export default async function ServerHome() {
  const idUser = await getIdUserActual();

  return <Home idUser={idUser} />;
}