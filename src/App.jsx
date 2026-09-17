import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { GradientWave } from "./GradientWave.jsx";
import { HeroCycloidalDrive } from "./HeroCycloidalDrive.jsx";
import { capabilities, education, experience, profile, projects } from "./data.js";

const qaMode = new URLSearchParams(window.location.search).has("qa");

const reveal = qaMode ? {} : {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
};

function Header() {
  const [open, setOpen] = useState(false);
  const [compactViewport, setCompactViewport] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const update = () => setCompactViewport(window.innerWidth <= 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const transitionDistance = compactViewport ? 130 : 170;
  const earlyTransition = compactViewport ? 36 : 46;
  const smoothScrollY = useSpring(scrollY, { stiffness: 150, damping: 30, mass: 0.18 });
  const wordmarkScale = useTransform(
    smoothScrollY,
    [0, earlyTransition, transitionDistance],
    [1, compactViewport ? 0.48 : 0.323, compactViewport ? 0.355 : 0.216],
  );
  const wordmarkY = useTransform(
    smoothScrollY,
    [0, earlyTransition, transitionDistance],
    [compactViewport ? 72 : 78, compactViewport ? 8 : 10, 0],
  );
  const headerAtmosphereOpacity = useTransform(smoothScrollY, [12, compactViewport ? 70 : 82], [0, 1]);

  return (
    <header className="site-header">
      <motion.div className="header-atmosphere" style={{ opacity: headerAtmosphereOpacity }} aria-hidden="true" />
      <motion.a className="wordmark" href="#top" aria-label="Joshua Tarara, back to top" style={{ scale: wordmarkScale, y: wordmarkY }}>
        Joshua Tarara
      </motion.a>
      <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
        <a href="#education" onClick={() => setOpen(false)}>Education</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="gradient-layer" aria-hidden="true">
        <GradientWave />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-name-space" aria-hidden="true" />
        <motion.p className="eyebrow" {...reveal}>{profile.label}</motion.p>
        <motion.div className="hero-portrait" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <img src="/assets/headshot.png" alt="Joshua Tarara" />
        </motion.div>
        <motion.div className="hero-action" {...reveal} transition={{ ...reveal.transition, delay: 0.16 }}>
          <a href="#projects" className="circle-link">
            <span className="circle-icon"><ArrowDown weight="light" /></span>
            <span>View Projects</span>
          </a>
        </motion.div>
      </div>
      <HeroCycloidalDrive />
    </section>
  );
}

function Projects() {
  return (
    <section className="section work-section" id="projects">
      <motion.div className="section-heading" {...reveal}>
        <p className="section-index">04 / Portfolio</p>
        <h2>Featured projects</h2>
      </motion.div>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.a className="project-row" href={project.href} key={project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55, delay: index * 0.045 }}>
            <span className="project-number">{project.index}</span>
            <span className="project-main">
              <span className="project-title">{project.title}</span>
              <span className="project-detail">{project.detail}</span>
            </span>
            <span className="project-category">{project.category}</span>
            <ArrowUpRight className="project-arrow" weight="light" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <motion.div className="section-heading" {...reveal}>
        <p className="section-index">01 / About</p>
        <h2>About Joshua Tarara</h2>
      </motion.div>
      <div className="about-grid">
        <motion.div className="about-copy" {...reveal}>
          <p>{profile.statement}</p>
          <p>I study Mechanical Engineering at Florida Tech, specializing in Robotics and Control with a minor in Business Management. My work spans defense microelectronics, mechatronics, manufacturing automation, and UAS development.</p>
          <div className="micro-facts">
            <span>Boston, MA + Space Coast, FL</span>
            <span>Florida Tech · Class of 2028</span>
            <span>Open to opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <motion.div className="section-heading compact" {...reveal}>
        <p className="section-index">03 / Experience</p><h2>Industry work</h2>
      </motion.div>
      <div className="experience-list">
        {experience.map(({ timeframe, role, company, summary }) => (
          <motion.div className="experience-row" key={`${company}-${timeframe}`} {...reveal}>
            <span className="experience-time">{timeframe}</span>
            <div className="experience-role">
              <strong>{role}</strong>
              <span className="experience-company">{company}</span>
            </div>
            <p>{summary}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section capability-section" id="skills">
      <motion.div className="section-heading compact" {...reveal}>
        <p className="section-index">02 / Technical skills</p><h2>Tools and technologies</h2>
      </motion.div>
      <div className="capability-grid">
        {capabilities.map((group) => (
          <motion.div className="capability-column" key={group.title} {...reveal}>
            <h3>{group.title}</h3><p>{group.items.join(" · ")}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section education-section" id="education">
      <motion.div className="section-heading" {...reveal}>
        <p className="section-index">05 / Education</p>
        <h2>Education</h2>
      </motion.div>
      <div className="education-layout">
        <motion.div className="education-primary" {...reveal}>
          <p className="education-kicker">Florida Institute of Technology</p>
          <h3>{education.degree}</h3>
          <p>{education.timeframe}</p>
          <p>Robotics and Control specialization · Business Management minor</p>
        </motion.div>
        <motion.div className="education-details" {...reveal}>
          <div>
            <h3>Coursework</h3>
            <p>{education.coursework.join(" · ")}</p>
          </div>
          <div>
            <h3>Awards + certifications</h3>
            <p>{education.awards.join(" · ")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="site-footer" id="contact">
      <motion.div className="footer-main" {...reveal}>
        <div className="footer-identity">
          <p>{profile.name}</p>
          <span>{profile.label}</span>
        </div>
        <div className="contact-links">
          <a href={profile.email}>Email <ArrowUpRight /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
        </div>
      </motion.div>
      <div className="footer-meta">
        <span>Boston, MA + Space Coast, FL</span>
        <span>© 2026 Joshua Tarara</span>
      </div>
    </footer>
  );
}

export function App() {
  return <div className="site-shell"><Header /><main><Hero /><About /><Skills /><Experience /><Projects /><Education /></main><Contact /></div>;
}
