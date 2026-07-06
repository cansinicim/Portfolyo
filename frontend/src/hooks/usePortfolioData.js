import { useEffect, useState } from 'react';
import client from '../api/client.js';

export function usePortfolioData() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socials, setSocials] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      client.get('/profile'),
      client.get('/skills'),
      client.get('/projects?limit=100'),
      client.get('/socials'),
      client.get('/experience'),
    ])
      .then(([profileRes, skillsRes, projectsRes, socialsRes, experienceRes]) => {
        setProfile(profileRes.data.data);
        setSkills(skillsRes.data.data || []);
        setProjects(projectsRes.data.data?.projects || []);
        setSocials(socialsRes.data.data || []);
        setExperience(experienceRes.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return { profile, skills, projects, socials, experience, loading };
}
