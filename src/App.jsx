import { Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AllApps from "./pages/AllApps";
import CafeRestaurantPOS from "./pages/CafeRestaurantPOS";
import CafeRestaurantPOSPricing from "./pages/CafeRestaurantPOSPricing";
import AccountingSoftware from "./pages/AccountingSoftware";
import AccountingSoftwarePricing from "./pages/AccountingSoftwarePricing";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apps" element={<AllApps />} />
        <Route path="/pos/cafe-restaurant" element={<CafeRestaurantPOS />} />
        <Route path="/pos/cafe-restaurant/pricing" element={<CafeRestaurantPOSPricing />} />
        <Route path="/accounting-software" element={<AccountingSoftware />} />
        <Route path="/accounting-software/pricing" element={<AccountingSoftwarePricing />} />
      </Routes>
      <Footer />
    </div>
  );
}
