import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 font-sans selection:bg-orange-500 selection:text-white antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
