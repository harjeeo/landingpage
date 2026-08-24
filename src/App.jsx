import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import WorkSmarter from "./components/WorkSmarter";
import WhyConnected from "./components/WhyConnected";
import IconSlider from "./components/IconSlider";
import Faq from "./components/Faq";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <LogoStrip />
      <WorkSmarter />
      <WhyConnected />
      <IconSlider />
      <Faq />
    </div>
  );
}
