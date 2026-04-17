import { useState } from 'react'
import './App.css'
import { projects, featuredProjects } from './projectsData'

const heroLinks = [
  { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com/in/tararajoshua' },
  { label: 'Email', icon: 'mail', href: 'mailto:Tararajoshua@gmail.com' },
]

const aboutHighlights = [
  { label: 'Boston MA and Space Coast FL', icon: 'pin' },
  { label: 'Florida Tech Class of 2028', icon: 'cap' },
  { label: 'Open to Opportunities', icon: 'brief' },
]

const stats = [
  { value: '4+', label: 'Years of Industry Experience' },
  { value: '20+', label: 'Designs Projects' },
  { value: 'Multiple', label: 'DoW Programs' },
]

const skills = [
  {
    title: 'CAD & Design',
    icon: 'cad',
    items: [
      'SolidWorks',
      'AutoCAD',
      'Creo 11',
      'NX',
      'KiCAD',
      'Altium',
      'Altium co-designer',
      'Onshape',
      'Solidworks PDM',
    ],
  },
  {
    title: 'Analysis & Simulation',
    icon: 'analysis',
    items: ['ANSYS FEA', 'ANSYS Thermal', 'SolidWorks Simulation', 'MATLAB'],
  },
  {
    title: 'Manufacturing & Fixturing',
    icon: 'wrench',
    items: [
      'Sub-micron Fixturing',
      'Wire-Bonding Fixtures',
      'FDM',
      'SLA',
      'SLS',
      'CNC Mill (3-Axis)',
      'Manual & DRO Lathe',
      'AMF Certified',
    ],
  },
  {
    title: 'Robotics & Controls',
    icon: 'robot',
    items: [
      'Computer Vision',
      'AprilTag Processing',
      'PID',
      'Automatic Fiber Optical Alignment',
      'Software-Controlled Precision Fixturing',
      'UAS Systems',
      'Mechatronics',
      'Sensor Integration',
    ],
  },
  {
    title: 'Programming',
    icon: 'code',
    items: [
      'C++',
      'C#',
      'Python',
      'MATLAB',
      'SQL',
      'Github',
      'VBA',
      'CAD Software Automation',
      'Agentic AI Coding',
    ],
  },
  {
    title: 'BD & Methodologies',
    icon: 'strategy',
    items: [
      'Technology Roadmapping',
      'Product Roadmapping',
      'DoW Program/contract Proposals',
      'SCRUM',
      'Agile',
      'JIT',
      'FoM Analysis',
      'SOTA Analysis',
      'Strategic Buisness Development',
    ],
  },
  {
    title: 'PCB & Electronics',
    icon: 'bolt',
    items: [
      'PCB Enclosure Design',
      'Soldering & Assembly',
      'RF Lab Work',
      'Fiber Optics',
      'VITA Spec Design',
    ],
  },
]

const experience = [
  {
    role: 'Mechanical Engineering Intern',
    company: 'Critical Frequency Design',
    logo: '/CFD_Blue-horizontal-logo.webp',
    timeframe: 'May 2025 - Aug 2025',
    bullets: [
      'Designed and manufactured VITA Spec housings for defense applications',
      'Developed a PIC probing station using mechatronics & software design',
      'Collaborated with CTO on SBIR proposals and product roadmaps',
      'Delivered multiple program-critical products for contractors',
    ],
  },
  {
    role: 'Mechanical Engineering Intern',
    company: 'Mercury Systems',
    logo: '/MRCY-9960c6f4.png',
    timeframe: 'May 2023 - Jul 2024',
    bullets: [
      'Designed 20+ in-house assembly fixtures for ESS, Wire-bonding, and Automation',
      'Assisted in DoW qualification of two active programs',
      'Developed 10+ Chip-and-wire RF layouts & component block library',
      'Created program critical fixturing & re-work designs and drawings',
    ],
  },
  {
    role: 'Student & Mentor',
    company: 'BAE Systems - FOCUS Program',
    logo: '/BA.L.png',
    timeframe: 'Oct 2022 - Mar 2023',
    bullets: [
      'Completed BAE Systems FOCUS pre-internship program in 1st place',
      'Returned to mentor next session of the program',
      'Gained exposure to defense industry practices and standards',
    ],
  },
  {
    role: 'Inventory Logistics Intern',
    company: 'Scott Electronics',
    logo: '/scott-logo-2.svg',
    timeframe: 'Oct 2022 - Feb 2023',
    bullets: [
      'Used SQL and Infor to manage customer data and inventory',
      'Implemented Just-In-Time (JIT) inventory practices',
      'Optimized stock management processes',
    ],
  },
]

// projects + filters come from src/projectsData.js (shared with the static
// project-page generator at scripts/build-project-pages.mjs).

const education = {
  degree: 'B.S. Mechanical Engineering',
  school: 'Florida Institute of Technology',
  timeframe: '2024 - 2028 (Expected)',
  highlights: [
    'Specialization in Robotics and Control',
    'Minor in Business Management',
  ],
  coursework: [
    'Robotics & Control Systems',
    'Thermodynamics',
    'Machine Design',
    'Manufacturing Processes',
    'Materials Science',
    'CAD Design Automation',
    'CAD/CAM',
    'Product Marketing',
    'Technology Roadmapping',
    'Agile Project Management',
  ],
  awards: [
    { title: 'AMF Certification', org: 'SME', year: '2024' },
    { title: 'Eagle Scout', org: 'BSA', year: '2022' },
    {
      title: 'New England Excellence in Engineering Award',
      org: 'FIRST',
      year: '2023',
    },
    {
      title: 'District Excellence in Engineering Award',
      org: 'FIRST',
      year: '2024',
    },
    { title: '2X SkillsUSA State Champion', org: 'SkillsUSA', year: '2022 & 2023' },
  ],
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">Joshua Tarara</div>
        <button
          className={isMenuOpen ? 'menu-toggle open' : 'menu-toggle'}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={isMenuOpen ? 'nav open' : 'nav'}>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <span className="badge">Mechanical Engineering Student</span>
          <h1>Joshua Tarara</h1>
          <p className="hero-sub">
            Specializing in mechanical designs for DoW microelectronics, embedded
            systems, and avionics. Experience in VITA-spec housing, RF layouts, and
            precision fixturing with research interests in UAS and optomechanical
            design.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contact">
              Get in Touch
            </a>
            <a className="ghost" href="/projects/index.html">
              View all Projects
            </a>
          </div>
          <div className="hero-links">
            {heroLinks.map((link) => (
              <a
                className="icon-btn"
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className={`icon ${link.icon}`} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
          <div className="hero-scroll">↓</div>
          <div className="hero-hex" aria-hidden="true" />
        </section>

        <section id="about" className="section about">
          <div className="about-media">
            <div className="portrait">
              <img
                src="/headshot.png"
                alt="Joshua Tarara headshot"
                className="portrait-img"
              />
            </div>
          </div>
          <div className="about-content">
            <p className="eyebrow">ABOUT ME</p>
            <h2>Engineering the Future, One Design at a Time</h2>
            <p>
              I'm a Mechanical Engineering student at Florida Institute of
              Technology specializing in Robotics and Control with a minor in
              Business Management. With 4+ years of industry experience, I
              specialize in mechanical designs for DoW microelectronics, embedded
              systems, and avionics applications at Mercury Systems and Critical
              Frequency Design.
            </p>
            <p>
              My expertise includes VITA-spec housing design, RF chip-and-wire
              layouts, precision fixturing for defense manufacturing, and UAS
              platform development. I combine technical engineering skills with
              entrepreneurial thinking to deliver mission-critical solutions for
              defense contractors.
            </p>
            <div className="about-highlights">
              {aboutHighlights.map((item) => (
                <div key={item.label} className="highlight">
                  <span className={`icon ${item.icon}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section skills">
          <p className="eyebrow">TECHNICAL SKILLS</p>
          <h2>Tools & Technologies</h2>
          <p className="section-sub">
            A comprehensive toolkit developed through coursework, projects, and
            hands-on experience.
          </p>
          <div className="skill-grid">
            {skills.map((group) => (
              <article className="skill-card" key={group.title}>
                <div className={`skill-icon ${group.icon}`} />
                <h3>{group.title}</h3>
                <div className="pill-row">
                  {group.items.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience">
          <p className="eyebrow">PROFESSIONAL EXPERIENCE</p>
          <h2>Work Experience</h2>
          <p className="section-sub">
            Hands-on experience in defense avionics, RF systems, and advanced
            manufacturing.
          </p>
          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience-card" key={job.role + job.company}>
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="experience-logo"
                  />
                )}
                <div className="experience-header">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                  <span className="date">{job.timeframe}</span>
                </div>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects">
          <p className="eyebrow">PORTFOLIO</p>
          <h2>Featured Projects</h2>
          <p className="section-sub">
            A selection of engineering projects showcasing problem-solving skills
            and technical expertise.
          </p>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <a
                className="project-card"
                key={project.title}
                href={`/projects/${project.slug}.html`}
              >
                <div
                  className="project-media"
                  aria-hidden="true"
                  style={{
                    backgroundImage: project.imageUrl
                      ? `url(${project.imageUrl})`
                      : project.gradient,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="project-body">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="pill-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pill light">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="link-btn" aria-hidden="true">
                  View Project →
                </span>
              </a>
            ))}
          </div>
          <div className="see-all-wrap">
            <a className="see-all-pill" href="/projects/index.html">
              See all projects
              <span className="see-all-count">{projects.length}</span>
              <span className="see-all-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section id="education" className="section education">
          <p className="eyebrow">ACADEMIC BACKGROUND</p>
          <h2>Education & Certifications</h2>
          <div className="education-grid">
            <article className="education-card">
              <div className="education-header">
                <h3>{education.degree}</h3>
                <p className="company">{education.school}</p>
                <span className="date">{education.timeframe}</span>
              </div>
              <div>
                <p className="mini-title">Highlights</p>
                <ul>
                  {education.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mini-title">Relevant Coursework</p>
                <div className="pill-row">
                  {education.coursework.map((course) => (
                    <span key={course} className="pill light">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            <article className="education-card awards">
              <div className="education-header">
                <h3>Awards and Certifications</h3>
              </div>
              <div className="award-list">
                {education.awards.map((award) => (
                  <div className="award" key={award.title}>
                    <p className="award-title">{award.title}</p>
                    <p className="award-meta">
                      {award.org} · {award.year}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="section contact">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Let's Connect</h2>
          <p className="section-sub">
            Interested in collaborating or have an opportunity? I'd love to hear
            from you.
          </p>
          <div className="contact-grid">
            <div className="contact-info">
              <p>Feel free to reach out through any of these channels.</p>
              <div className="contact-item">
                <span className="icon mail" aria-hidden="true" />
                Tararajoshua@gmail.com
              </div>
              <div className="contact-item">
                <span className="icon phone" aria-hidden="true" />
                (603) 327 1113
              </div>
              <div className="contact-item">
                <span className="icon in" aria-hidden="true" />
                linkedin.com/in/tararajoshua
              </div>
              <p className="availability">
                Available for internships, research collaborations, and engineering
                projects.
              </p>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default App
