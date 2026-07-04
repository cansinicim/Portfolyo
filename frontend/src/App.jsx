import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AuroraBackground from './components/AuroraBackground.jsx';
import { usePortfolioData } from './hooks/usePortfolioData.js';

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
}

export default function App() {
  const { profile, skills, projects, socials, loading } = usePortfolioData();

  return (
    <>
      <AuroraBackground />
      <ScrollProgress />
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} skills={skills} />
        <Projects projects={projects} loading={loading} />
        <Skills skills={skills} />
        <Contact profile={profile} socials={socials} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
