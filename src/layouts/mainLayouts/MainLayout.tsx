import { Outlet } from "react-router-dom";
import Navbar from "../../sharedComponents/navbar/Navbar";
import Footer from "../../sharedComponents/footer/Footer";
import "./MainLayout.css";
import ScrollToTopButton from "../../components/ScrollToTopButton";

const MainLayout = () => {
  return (
    <div className="xl:container xl:mx-auto mx-6">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
