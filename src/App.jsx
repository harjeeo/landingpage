import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import WorkSmarter from "./components/WorkSmarter";
import SimpleTools from "./components/SimpleTools";
import FeatureGrid from "./components/FeatureGrid";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <LogoStrip />
      <WorkSmarter />
      <SimpleTools />
      <FeatureGrid />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
