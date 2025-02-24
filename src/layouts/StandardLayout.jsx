import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import Footer from "../ui/footer";

function StandardLayout() {
  return (
    <div className="std-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default StandardLayout;
