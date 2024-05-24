import { getIdUserActual } from "../../lib/actions";
import Sidebar from "../components/sidebar";

export default async function ServerSidebar() {
  const idUser = await getIdUserActual();

  return <Sidebar idUser={idUser} />;
}