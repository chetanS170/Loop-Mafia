import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Workflow from './components/Workflow';
import ToolsStack from './components/ToolsStack';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    // Force dark class on mount to ensure consistency
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="bg-cream dark:bg-deep-night min-h-screen font-sans selection:bg-clay selection:text-white transition-colors duration-500">
      <Navbar />
      <main>
        <Hero toggleTheme={toggleTheme} isDark={isDark} />
        <Services />
        <Workflow />
        <CaseStudies />
        <Testimonials />
        <Booking />
        <ToolsStack />
      </main>
      <Footer />
    </div>
  );
}

export default App;