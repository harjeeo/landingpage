import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Form from '../components/Form.jsx';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#F5F5F6', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#000000' }}>
      <Navbar />
      <div style={{ paddingTop: '4rem' }}>
        <Form />
      </div>
      <Footer />
    </div>
  );
}
