import DashboardSidebar from "../../components/DashboardSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen lg:flex">
      <DashboardSidebar />
      <div className="flex-1">
        <div className="px-10 mt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
