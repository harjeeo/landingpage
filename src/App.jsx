import { Routes, Route, useLocation } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AllApps from "./pages/AllApps";
import CafeRestaurantPOS from "./pages/CafeRestaurantPOS";
import AccountingSoftware from "./pages/AccountingSoftware";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-white">
      {!isDashboard && <AnnouncementBar />}
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apps" element={<AllApps />} />
        <Route path="/pos/cafe-restaurant" element={<CafeRestaurantPOS />} />
        <Route path="/accounting-software" element={<AccountingSoftware />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
}
