import Sidebar from "../../components/Bars/sidebar";
import Topbar from "../../components/Bars/topbar";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 ">
      <>
        <Topbar />
      </>

      <Sidebar />

      <Outlet />
    </div>
  );
}
