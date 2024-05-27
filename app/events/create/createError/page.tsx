import EventError from "../../../components/eventError";
import Sidebar from "@/app/serverComponents/serverSidebar";

export default function Fail() {
  return (
    <>
      <Sidebar />
      <EventError />
    </>
  )
}