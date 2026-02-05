import { useMemo, useState } from 'react'
import './App.css'

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
    timeframe: 'Oct 2022 - Feb 2023',
    bullets: [
      'Used SQL and Infor to manage customer data and inventory',
      'Implemented Just-In-Time (JIT) inventory practices',
      'Optimized stock management processes',
    ],
  },
]

const filters = [
  'All',
  'Defense',
  'UAS',
  'RF Design',
  'Mechatronics',
  'Manufacturing',
  'Computer Vision',
  'Software',
  'Mechanical Design',
]

const projects = [
  {
    title: 'VITA Spec 3U VPX Housing Design',
    category: 'Defense',
    description:
      'Designed and manufactured MIL-SPEC 3U VPX style housings for chip-and-wire RF microelectronics in defense avionics systems.',
    tags: ['VITA Spec', 'MIL-SPEC', 'DoW', 'Microelectronics'],
    details:
      'Designed modular 3U VPX housings with thermal and EMI considerations for defense avionics. Delivered manufacturing-ready drawings, tolerance stacks, and assembly guidelines to meet MIL-SPEC requirements.',
    gradient: 'linear-gradient(135deg, #dbeafe, #e9d5ff)',
  },
  {
    title: 'RF Chip-and-Wire Layouts',
    category: 'RF Design',
    description:
      'Developed 10+ chip-and-wire RF layouts and component block libraries for high-frequency defense microelectronics at Mercury Systems.',
    tags: ['RF Design', 'Microelectronics', 'DoW Programs'],
    details:
      'Created RF layout standards, component libraries, and layout reviews to improve design consistency. Supported qualification efforts and reduced layout iteration time.',
    gradient: 'linear-gradient(135deg, #fee2e2, #fde68a)',
  },
  {
    title: 'Multi-Up Wire Bonding Fixture',
    category: 'Manufacturing',
    description:
      'Precision fixturing system for wire-bonding operations in DoW-qualified microelectronics manufacturing programs.',
    tags: ['Fixturing', 'Wire Bonding', 'DoW Qualification'],
    imageUrl:
      'https://framerusercontent.com/images/DfzwHQ9Vtgtg5HD5neepVE4G68.jpg',
    details:
      'Built multi-up fixtures that reduced setup time and improved alignment repeatability. Documented critical dimensions and inspection workflows to support production.',
    gradient: 'linear-gradient(135deg, #dcfce7, #a7f3d0)',
  },
  {
    title: 'PIC Probing Station',
    category: 'Mechatronics',
    description:
      'Automated benchtop probing machine for Photonic Integrated Circuits combining mechanical design, automation, and software control.',
    tags: ['Mechatronics', 'Photonics', 'Automation'],
    details:
      'Integrated motion control, probing mechanics, and software for repeatable test workflows. Improved probing accuracy while streamlining operator setup.',
    gradient: 'linear-gradient(135deg, #e0f2fe, #c7d2fe)',
  },
  {
    title: 'TALOS - Thermal Aerial Lift System',
    category: 'UAS',
    description:
      'Project manager for MUAV group developing thermal aerial observation systems for Mars exploration research at Florida Tech ARES.',
    tags: ['UAS', 'Project Management', 'Research'],
    imageUrl:
      'https://framerusercontent.com/images/zsTqWPQbuuMtuIKKO7i1qWsY.png',
    details:
      'Led system planning, payload integration strategy, and test schedules for thermal imaging missions. Coordinated team deliverables and requirement tracking.',
    gradient: 'linear-gradient(135deg, #fde68a, #fecaca)',
  },
  {
    title: 'Aeroversa Systems',
    category: 'UAS',
    description:
      'Startup developing modular drone platforms for industrial inspection to increase mission efficiency and specialization.',
    tags: ['Startup', 'UAV Design', 'Systems Engineering'],
    imageUrl:
      'https://framerusercontent.com/images/fTtGOacsc4zL2WzIEctyEEosjTw.png',
    details:
      'Developed modular payload bays, structural concepts, and avionics integration approach for multi-mission inspection work.',
    gradient: 'linear-gradient(135deg, #f3e8ff, #c4b5fd)',
  },
  {
    title: 'Camera Telemetry Stabilization',
    category: 'Computer Vision',
    description:
      'Computer vision framework for drone stabilization using downfacing cameras and Apriltag processing for positioning data.',
    tags: ['Computer Vision', 'Python', 'UAS'],
    imageUrl:
      'https://framerusercontent.com/images/jSNB4ow0iohs8xvHntYv9KSRM.png',
    details:
      'Implemented AprilTag pose estimation and control loops to stabilize a drone over a target. Built simulations for tuning and performance verification.',
    gradient: 'linear-gradient(135deg, #cffafe, #99f6e4)',
  },
  {
    title: 'Interactive PLM System',
    category: 'Software',
    description:
      'Advanced Product Lifecycle Management system with dependency tracking and interactive visualization for engineering workflows.',
    tags: ['PLM', 'Software', 'Systems Engineering'],
    imageUrl:
      'https://framerusercontent.com/images/JVAstl52cVR86eFVzDRUj3wiCU.jpg',
    details:
      'Built a desktop PLM prototype with dependency graphs, revision tracking, and search workflows to speed part navigation.',
    gradient: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
  },
  {
    title: 'Menzi Muck M220x Reverse Engineering',
    category: 'Mechanical Design',
    description:
      'Complete reverse engineering analysis of Menzi Muck walking excavator including mechanical systems, hydraulics, and documentation.',
    tags: ['Reverse Engineering', 'CAD', 'Mechanical Systems'],
    imageUrl:
      'https://framerusercontent.com/images/TrR3HJE5jRlil3i82iFZNjJMCm8.jpg',
    details:
      'Generated subsystem models and assembly drawings from technical documentation. Documented mechanical interfaces and motion constraints.',
    gradient: 'linear-gradient(135deg, #fef3c7, #e5e7eb)',
  },
]

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
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">Portfolio</div>
        <nav className="nav">
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
            <a className="ghost" href="#projects">
              View Projects
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
          <div className="filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={filter === activeFilter ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
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
                <button
                  className="link-btn"
                  type="button"
                  onClick={() => setActiveProject(project)}
                >
                  View Project →
                </button>
              </article>
            ))}
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

      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true">
          <div className="project-modal-card">
            <button
              className="modal-close"
              type="button"
              onClick={() => setActiveProject(null)}
            >
              Close
            </button>
            <p className="project-category">{activeProject.category}</p>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.details}</p>
            <div className="pill-row">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="pill light">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
