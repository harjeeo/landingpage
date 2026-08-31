import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import WorkSmarter from "./components/WorkSmarter";
import PlatformFeatures from "./components/PlatformFeatures";
import WhyConnected from "./components/WhyConnected";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <LogoStrip />
      <WorkSmarter />
      <PlatformFeatures />
      <WhyConnected />
      <Faq />
      <Footer />
    </div>
  );
}
