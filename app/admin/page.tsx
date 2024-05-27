import ManageEvents from "../serverComponents/serverManageEvents";
import Sidebar from "@/app/serverComponents/serverSidebar";

export default function EventsPage() {

  return (
    <>
      <Sidebar />
      <ManageEvents />
    </>
  );
}