import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ShaderBackground from './components/ShaderBackground.jsx';
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
  const { profile, skills, projects, socials, experience, loading } = usePortfolioData();
  const viewSourceUrl = socials.find((s) => s.platform?.toLowerCase() === 'github' || s.icon?.toLowerCase() === 'github')?.url;

  return (
    <>
      <ShaderBackground />
      <ScrollProgress />
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} viewSourceUrl={viewSourceUrl} />
        <About profile={profile} skills={skills} experience={experience} />
        <Projects projects={projects} loading={loading} viewSourceUrl={viewSourceUrl} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} socials={socials} />
    </>
  );
}
