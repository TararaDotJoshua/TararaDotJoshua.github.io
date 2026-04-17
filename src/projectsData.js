// Single source of truth for projects, shared between App.jsx and the
// static project-page generator in scripts/build-project-pages.mjs.
//
// Each project has the original fields (title, category, description, tags,
// details, imageUrl/gradient) plus extended fields used to render the
// expanded STAR-format page:
//   slug       — URL slug, used as filename under /projects/<slug>.html
//   facts      — [{ k, v, hl? }] rows for the sticky sidebar fact sheet
//   star       — { problem, approach, action, result } blocks
//                each block is { h2, body, chips? }
//                result can also carry { metrics: [{ k, v }] }

export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const filters = [
  'All',
  'Defense',
  'Business Development',
  'UAS',
  'RF Design',
  'Mechatronics',
  'Manufacturing',
  'Computer Vision',
  'Data Analysis',
  'Software',
  'Mechanical Design',
];

const rawProjects = [
  {
    title: 'VITA Spec 3U VPX Housing Design',
    category: 'Defense',
    description:
      'Modular FDM enclosures for 3U VPX boards, single backplanes, and RTM cards across 4 defense programs. ESD-safe, probe-accessible, and evaluated as shipping enclosures.',
    tags: ['SolidWorks', 'Altium CoDesigner', 'FDM', 'ESD PETG', 'VITA 46', '3U VPX'],
    details:
      'Designed and printed a modular family of ESD-safe enclosures for prototype 3U VPX boards, single backplanes, and RTM cards used across 4 programs. Each cage was modeled in SolidWorks using Altium CoDesigner board geometry. A shared centerline offset from the VPX fin connector keeps every variant level on a table. The open-frame design allows heatsink attachment and full component probe access without disassembly. Printed in Stratasys ESD PETG on internal FDM equipment. One card variant was evaluated as a contractor shipping enclosure.',
    gradient: 'linear-gradient(135deg, #dbeafe, #e9d5ff)',
    role: 'Mechanical Designer',
    timeframe: '2025',
    facts: [
      { k: 'Category', v: 'Defense' },
      { k: 'Role', v: 'Mechanical Designer' },
      { k: 'Employer', v: 'CFD' },
      { k: 'Year', v: '2025' },
      { k: 'Standard', v: 'VITA 46 / VPX' },
      { k: 'Form factor', v: '3U' },
      { k: 'Programs', v: '4' },
      { k: 'Material', v: 'Stratasys ESD PETG' },
      { k: 'Process', v: 'FDM' },
    ],
    star: {
      problem: {
        h2: 'No off-the-shelf enclosure fit prototype 3U VPX boards in the lab.',
        body: 'Engineers needed to safely handle, test, and store prototype 3U VPX boards, backplanes, and RTM cards without a full chassis. Boards required heatsink access and the ability to probe every component during bring-up.',
      },
      approach: {
        h2: 'Build a modular cage family with a shared VPX connector datum.',
        body: 'Modeled each cage in SolidWorks using Altium CoDesigner to import accurate board geometry. Established a standard offset from the VPX fin connector centerline so every variant sits level on a flat surface. Designed open sidewalls for probe access and heatsink clearance. Printed in Stratasys ESD PETG to prevent electrostatic discharge near live boards.',
      },
      action: {
        h2: 'Designed, printed, and deployed enclosures across 4 programs.',
        body: 'Built the full cage library from the Advanced Processing Team\'s board designs. Printed parts on internal Stratasys FDM equipment. Distributed cages to the lab for daily board handling. One 3U card variant was submitted as a candidate shipping enclosure for delivery to a contractor.',
        chips: ['SolidWorks', 'Altium CoDesigner', 'FDM', 'ESD PETG', 'VITA 46', '3U VPX'],
      },
      result: {
        h2: 'Modular enclosure system deployed across 4 programs.',
        body: 'The cage family covered 3U VPX boards, single backplanes, and RTM cards with a single shared connector datum. One variant advanced to shipping enclosure evaluation. The modular approach reduced design time for each new card to incremental geometry changes only.',
      },
    },
  },
  {
    title: 'RF Chip-and-Wire Layouts',
    category: 'RF Design',
    description:
      '10+ chip-and-wire RF layouts and a shared component block library for high-frequency defense microelectronics at Mercury Systems.',
    tags: ['AutoCAD', 'SolidWorks PDM', 'RF Design', 'Microelectronics', 'DoW Programs'],
    details:
      'Produced 10+ chip-and-wire RF layouts in AutoCAD and managed all releases through SolidWorks PDM. Captured recurring RF blocks in a shared library and wrote a layout convention so reviews could check against a standard instead of redoing geometry. Library content carried forward across two active DoW programs.',
    gradient: 'linear-gradient(135deg, #fee2e2, #fde68a)',
    role: 'RF Layout Engineering Intern',
    timeframe: '2023 – 2024',
    facts: [
      { k: 'Category', v: 'RF Design' },
      { k: 'Role', v: 'Layout intern' },
      { k: 'Employer', v: 'Mercury Systems' },
      { k: 'Span', v: '2023 – 2024' },
      { k: 'Layouts', v: '10+' },
      { k: 'Tools', v: 'AutoCAD + SolidWorks PDM' },
      { k: 'Domain', v: 'Chip-and-wire RF' },
      { k: 'Output', v: 'Layouts + library' },
    ],
    star: {
      problem: {
        h2: 'Layouts were one-offs across two DoW programs.',
        body: 'Each board started from scratch. Reviews relitigated basic geometry, and nothing carried forward to the next layout.',
      },
      approach: {
        h2: 'Capture recurring blocks in a shared library and write a layout standard.',
        body: 'Catalogued footprints, clearances, and ground returns for the blocks that kept reappearing in AutoCAD. Wrote a layout convention so reviewers could check against the standard rather than redo it. Managed all layout revisions and releases through SolidWorks PDM.',
      },
      action: {
        h2: 'Released 10+ chip-and-wire layouts and grew the library in parallel.',
        body: 'Delivered layouts across both DoW programs in AutoCAD. Checked all files in and out through SolidWorks PDM. Folded review feedback back into the standard so the library improved with each board.',
        chips: ['AutoCAD', 'SolidWorks PDM', 'Chip-and-wire', 'DoW program', 'Library'],
      },
      result: {
        h2: 'Layout iteration time dropped, reviews focused on new content.',
        body: 'Library blocks were reused on follow-on boards. Qualification reviews stopped restating geometry that was already standardized. PDM provided a full revision history for every layout released.',
      },
    },
  },
  {
    title: 'Multi-Up Wire Bonding Fixture',
    category: 'Manufacturing',
    description:
      'Aluminum and spring-retained multi-up wire bonding fixture for a DoW-qualified microelectronics line. Machined alignment edge on the platform datum, repeatable clamp scheme, FAI documentation.',
    tags: ['Fixturing', 'Wire Bonding', 'DoW Qualification', 'SolidWorks'],
    imageUrl: 'https://framerusercontent.com/images/DfzwHQ9Vtgtg5HD5neepVE4G68.jpg',
    details:
      'Designed a multi-up, spring-retained fixture to hold products during wire bonding. Designed a machined aluminum alignment edge referenced directly to the platform datum to eliminate per-part operator alignment. Critical dimensions driven from the bond head tolerance budget. Released drawings, FAI notes, and an operator procedure.',
    gradient: 'linear-gradient(135deg, #dcfce7, #a7f3d0)',
    role: 'Mechanical Engineering Intern',
    timeframe: '2023 – 2024',
    facts: [
      { k: 'Category', v: 'Manufacturing' },
      { k: 'Role', v: 'Mechanical intern' },
      { k: 'Employer', v: 'Mercury Systems' },
      { k: 'Program status', v: 'DoW-qualified' },
      { k: 'Deliverable', v: 'Hardware + FAI + procedure' },
    ],
    star: {
      problem: {
        h2: 'Single-up bonding was the bottleneck on a qualified program.',
        body: 'Operators spent most of the shift aligning parts by hand before each bond run. Each manual setup risked drifting outside qualified tolerances, and throughput was limited to one part at a time.',
      },
      approach: {
        h2: 'Multi-up, spring-retained fixture with a machined datum edge.',
        body: 'Designed a machined aluminum alignment edge referenced to the platform datum so products locate without operator judgment. Spring retention holds each part down consistently across the carrier. Drove all critical dimensions from the bond head tolerance budget rather than the housing envelope.',
      },
      action: {
        h2: 'Released drawings, FAI notes, and an operator procedure.',
        body: 'Designed the fixture in SolidWorks. Coordinated machining of the aluminum alignment edge. Ran first article inspection against the bond head tolerance budget and documented the results. Released an operator procedure for loading and retaining parts.',
        chips: ['SolidWorks', 'Multi-up', 'Spring retention', 'Datum edge', 'FAI', 'Operator procedure'],
      },
      result: {
        h2: 'Per-part alignment eliminated; run-to-run variation held within acceptance.',
        body: 'The machined datum edge removed operator-to-operator variability in part placement. The spring-retained multi-up carrier increased parts bonded per run. Program maintained its DoW qualification through the fixture changeover.',
      },
    },
  },
  {
    title: '5 DoF AprilTag Robotic Arm',
    category: 'Mechatronics',
    description:
      '3D-printed five-axis arm with a wrist camera. AprilTag-based target detection, React web UI, and Python control on a Raspberry Pi over UART to a Duet 3 Mini 5+.',
    tags: ['Python', 'AprilTag', 'Raspberry Pi', 'React', 'RepRapFirmware'],
    imageUrl: '/arm.png',
    details:
      'Personal project built with a friend. Vision runs in Python using OpenCV and AprilTag 3 on a Raspberry Pi 4. React UI serves live joint state and manual jog controls, backed by a Python process on the Pi that drives a Duet 3 Mini 5+ over UART.',
    gradient: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    role: 'Co-developer',
    timeframe: '2025 · In progress',
    facts: [
      { k: 'Category', v: 'Mechatronics' },
      { k: 'Role', v: 'Co-developer' },
      { k: 'Year', v: '2025' },
      { k: 'Status', v: 'In progress' },
      { k: 'DoF', v: '5 revolute' },
      { k: 'Controller', v: 'Duet 3 Mini 5+' },
      { k: 'Compute', v: 'Raspberry Pi 4' },
      { k: 'Structure', v: 'PLA + M3' },
    ],
    star: {
      problem: {
        h2: 'Build a vision-driven five-axis arm on commodity hardware.',
        body: 'Mechanical design, motion control, computer vision, and a live UI in one personal project with no off-the-shelf control stack.',
      },
      approach: {
        h2: 'Four independent layers, each runnable in isolation.',
        body: 'Vision in Python using OpenCV and AprilTag 3 on the Pi. Motion on a Duet 3 Mini 5+ running RepRapFirmware, commanded over UART. React UI for live joint state display and manual jog. Each layer can be developed and tested without the others.',
      },
      action: {
        h2: 'Designed, wired, and integrated the full system.',
        body: 'Designed and printed the five-axis frame. Wired NEMA 17 steppers to the Duet 3. Wrote the Python vision and control process on the Pi. Built the React UI. Recalibrated camera intrinsics after a 15 cm pose bias appeared during integration.',
        chips: ['Python', 'OpenCV', 'AprilTag 3', 'React', 'UART', 'Duet 3', 'NEMA 17'],
      },
      result: {
        h2: 'Arm detects and tracks AprilTag targets. In active development.',
        body: 'Vision pipeline runs on the Pi and drives the Duet 3 over UART. React UI reflects live joint state. Project is ongoing.',
      },
    },
  },
  {
    title: 'PIC Probing Station',
    category: 'Mechatronics',
    description:
      'Benchtop probing station for Photonic Integrated Circuits with a software auto-alignment routine. Cubic spiral scan builds a 3D optical dot map, locks onto peak light output, then refines at higher resolution.',
    tags: ['Mechatronics', 'Photonics', 'Automation', 'Python', 'C#', 'Motion Control'],
    companyLogo: '/CFD_Blue-horizontal-logo.webp',
    details:
      'Built the mechanical alignment stack and wrote the auto-alignment software. C# interfaced with the Zaber motion stages to drive the probe through a cubic spiral, sampling optical power at each point to build a 3D dot map of light transmission through the chip. The probe advances forward to cover area, moves to the highest-power point found, then repeats at a finer resolution. Python handled data analysis of the dot map. Alignment converges to the peak transmission point without operator input.',
    gradient: 'linear-gradient(135deg, #e0f2fe, #c7d2fe)',
    role: 'Mechanical Engineering Intern',
    timeframe: 'Summer 2025',
    facts: [
      { k: 'Category', v: 'Mechatronics' },
      { k: 'Role', v: 'Mechanical + software intern' },
      { k: 'Employer', v: 'CFD' },
      { k: 'Year', v: '2025' },
      { k: 'Target', v: 'Photonic ICs' },
      { k: 'Alignment', v: 'Cubic spiral + peak seek' },
      { k: 'Scope', v: 'Mechanics, motion, SW' },
    ],
    star: {
      problem: {
        h2: 'Photonic chip probing required manual optical alignment.',
        body: 'Hand alignment to peak light output dominated test time and introduced operator-to-operator variance in characterization data. There was no repeatable way to find the optimal probe position.',
      },
      approach: {
        h2: 'Write a scan-and-seek routine that builds a 3D optical map and converges on peak transmission.',
        body: 'Designed the alignment algorithm around a cubic spiral scan. The probe steps forward to cover area, sampling optical power at each position. Each pass builds a 3D dot map of light intensity through the chip. After the coarse sweep, the probe moves to the highest-power point and repeats the scan at a finer resolution until alignment converges.',
      },
      action: {
        h2: 'Built the mechanical stack and implemented the auto-alignment software.',
        body: 'Designed the mechanical alignment stack and wrote the motion control and scanning software. Used C# to interface with the Zaber motion stages — the cubic spiral advances forward through the search volume, records optical power at every point, seeks the peak, and re-runs at higher resolution. Python analyzed the dot map data. Operator initiates the sequence; alignment runs to completion without intervention.',
        chips: ['C#', 'Python', 'Zaber Motion', 'Cubic spiral scan', '3D dot map', 'Peak seek', 'Auto-alignment', 'Photonics'],
      },
      result: {
        h2: 'Optical alignment automated from coarse search to sub-resolution convergence.',
        body: 'The station finds peak light transmission without operator input. Run-to-run variance dropped and other operators can execute the full test sequence without setup guidance.',
      },
    },
  },
  {
    title: 'TALOS - Thermal Aerial Lift System',
    category: 'UAS',
    description:
      'Project manager for the MUAV group at Florida Tech ARES, building a thermal-imaging UAS for Mars-relevant research.',
    tags: ['UAS', 'Project Management', 'Jira', 'Scrum', 'Research'],
    imageUrl: 'https://framerusercontent.com/images/zsTqWPQbuuMtuIKKO7i1qWsY.png',
    details:
      'Owned program planning, payload integration strategy, and test scheduling. Ran the team on Scrum using Jira for sprint tracking and backlog management. Set up requirement traceability so subsystem teams could move in parallel.',
    gradient: 'linear-gradient(135deg, #fde68a, #fecaca)',
    role: 'Project Manager',
    timeframe: '2024 – present',
    facts: [
      { k: 'Category', v: 'UAS' },
      { k: 'Role', v: 'Project manager' },
      { k: 'Group', v: 'Florida Tech ARES · MUAV' },
      { k: 'Mission', v: 'Thermal aerial observation' },
      { k: 'Context', v: 'Mars exploration research' },
      { k: 'Payload', v: 'Thermal imaging' },
      { k: 'Process', v: 'Scrum / Jira' },
    ],
    star: {
      problem: {
        h2: 'Stand up a thermal-imaging UAS program that produces usable data, not just airframes.',
        body: 'The group needed a repeatable platform and a test plan tied to mission objectives, with subsystem teams coordinated rather than working independently.',
      },
      approach: {
        h2: 'Decompose the program into sprints and schedule subsystems in parallel.',
        body: 'Broke the program into subsystem requirements and managed work through Scrum sprints tracked in Jira. Scheduled payload integration against mission windows. Wrote requirement traceability so subsystems could progress at the same time.',
      },
      action: {
        h2: 'Coordinated subsystem deliverables and ran the integration plan.',
        body: 'Ran sprint planning and backlog grooming in Jira. Tracked requirements, scheduled test events, and drove integration between thermal payload and airframe teams.',
        chips: ['Scrum', 'Jira', 'Program management', 'Requirements', 'Test scheduling'],
      },
      result: {
        h2: 'Group operating against a structured plan.',
        body: 'Documented integration plan and sprint-based schedule replaced ad-hoc builds. Jira backlog gave subsystem leads visibility into cross-team dependencies.',
      },
    },
  },
  {
    title: 'Aeroversa Systems',
    category: 'UAS',
    description:
      'Co-founder. Modular drone platform for industrial inspection. One airframe, mission-swappable payloads.',
    tags: ['Startup', 'UAV Design', 'Systems Engineering'],
    imageUrl: 'https://framerusercontent.com/images/fTtGOacsc4zL2WzIEctyEEosjTw.png',
    details:
      'Designed the structural platform and avionics integration around a standardized payload bay. Mission specialization happens in the bay, not the airframe.',
    gradient: 'linear-gradient(135deg, #f3e8ff, #c4b5fd)',
    role: 'Co-founder',
    timeframe: '2024 – present',
    facts: [
      { k: 'Category', v: 'UAS · Startup' },
      { k: 'Role', v: 'Co-founder' },
      { k: 'Market', v: 'Industrial inspection' },
      { k: 'Platform', v: 'Modular UAV' },
      { k: 'Scope', v: 'Structure + avionics' },
      { k: 'Stage', v: 'Concept → prototype' },
    ],
    star: {
      problem: {
        h2: 'Operators with multiple inspection missions end up running multiple fleets.',
        body: 'Inspection drones are priced and specced for single missions. There is room for one airframe that swaps mission hardware.',
      },
      approach: {
        h2: 'Build the airframe around a payload bay.',
        body: 'Standardized bay interface plus a common avionics interface across payloads. Mission specialization lives in the bay.',
      },
      action: {
        h2: 'Owning structure, payload bay design, and avionics integration.',
        body: 'Working from CAD through prototype hardware as a co-founder.',
        chips: ['Modular', 'Inspection', 'Systems eng.', 'Startup'],
      },
      result: {
        h2: 'One airframe covers multiple missions through bay swaps.',
        body: 'Concept holds up against the multi-fleet pattern operators currently maintain.',
      },
    },
  },
  {
    title: 'Camera Telemetry Stabilization',
    category: 'Computer Vision',
    description:
      'Down-facing AprilTag pose estimation feeding a control loop for drone station-keeping over a target.',
    tags: ['Computer Vision', 'Python', 'UAS'],
    imageUrl: 'https://framerusercontent.com/images/jSNB4ow0iohs8xvHntYv9KSRM.png',
    details:
      'AprilTag 3 pose estimation feeds an outer-loop controller that drives the drone toward the tag origin. Tuned in a simulation harness before flight.',
    gradient: 'linear-gradient(135deg, #cffafe, #99f6e4)',
    role: 'CV Engineer',
    timeframe: '2024',
    facts: [
      { k: 'Category', v: 'Computer Vision' },
      { k: 'Role', v: 'CV engineer' },
      { k: 'Platform', v: 'Drone · down-facing cam' },
      { k: 'Method', v: 'AprilTag pose est.' },
      { k: 'Stack', v: 'Python · OpenCV' },
      { k: 'Target', v: 'Station-keeping' },
    ],
    star: {
      problem: {
        h2: 'Hold a drone over a target, not a coordinate.',
        body: 'GPS holds station over a point. Holding over an object that drifts a few meters needs a vision reference tied to the target.',
      },
      approach: {
        h2: 'Use AprilTag pose as the control reference.',
        body: 'Down-facing camera runs AprilTag detection. Relative pose feeds the outer loop. Tune in simulation before flight.',
      },
      action: {
        h2: 'Built the pipeline plus a simulation harness for tuning.',
        body: 'Wrote pose estimation, the outer-loop controller, and a harness that replays synthetic tag motion at realistic camera rates. Tuned gains against the harness.',
        chips: ['AprilTag', 'OpenCV', 'Sim harness', 'Control tuning'],
      },
      result: {
        h2: 'Stabilization loop verified in simulation.',
        body: 'Ready to drop onto airframe hardware for flight tests.',
      },
    },
  },
  {
    title: 'Interactive PLM System',
    category: 'Software',
    description:
      'Desktop PLM prototype with a dependency graph view, revision tracking, and search.',
    tags: ['PLM', 'Software', 'Systems Engineering'],
    imageUrl: 'https://framerusercontent.com/images/JVAstl52cVR86eFVzDRUj3wiCU.jpg',
    details:
      'Prototype built around an interactive dependency graph with revision state. Search highlights the subgraph around each hit.',
    gradient: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
    role: 'Developer',
    timeframe: '2024',
    facts: [
      { k: 'Category', v: 'Software' },
      { k: 'Role', v: 'Developer' },
      { k: 'Type', v: 'Desktop prototype' },
      { k: 'Domain', v: 'PLM / part nav' },
      { k: 'Focus', v: 'Dependency graphs' },
    ],
    star: {
      problem: {
        h2: 'PLM tools hide part dependency behind tables.',
        body: 'Engineers want upstream and downstream context without scanning rows.',
      },
      approach: {
        h2: 'Treat dependency as the primary view.',
        body: 'Bake revision state into the graph. Make search highlight the subgraph around a hit.',
      },
      action: {
        h2: 'Implemented dependency tracking, revisions, and the graph view.',
        body: 'Tested navigation against representative assemblies and tuned the interaction.',
        chips: ['Dependency graph', 'Revision tracking', 'Search'],
      },
      result: {
        h2: 'Faster navigation than table-based PLM.',
        body: 'Test users reach upstream and downstream context visually. Clicks per part dropped.',
      },
    },
  },
  {
    title: 'Menzi Muck M220x Reverse Engineering',
    category: 'Mechanical Design',
    description:
      'Reverse-engineered the Menzi Muck M220x walking excavator from technical documentation. Subsystem CAD, top-level assembly, drawing package.',
    tags: ['Reverse Engineering', 'CAD', 'Mechanical Systems'],
    imageUrl: 'https://framerusercontent.com/images/TrR3HJE5jRlil3i82iFZNjJMCm8.jpg',
    details:
      'Modeled subsystem by subsystem. Locked interface geometry and motion constraints first so the top-level motion study closed when subsystems combined.',
    gradient: 'linear-gradient(135deg, #fef3c7, #e5e7eb)',
    role: 'Mechanical Designer',
    timeframe: '2024',
    facts: [
      { k: 'Category', v: 'Mechanical Design' },
      { k: 'Role', v: 'CAD / reverse eng.' },
      { k: 'Subject', v: 'Menzi Muck M220x' },
      { k: 'Type', v: 'Walking excavator' },
      { k: 'Scope', v: 'Mech + hydraulics' },
      { k: 'Output', v: 'CAD + drawings' },
    ],
    star: {
      problem: {
        h2: 'Reproduce a walking excavator from public documentation, not native CAD.',
        body: 'Multi-subsystem machine: mechanical, hydraulic, motion. The available record was technical documents.',
      },
      approach: {
        h2: 'Subsystem by subsystem. Lock interfaces first.',
        body: 'Treated each subsystem as its own build from documentation. Fixed interface geometry and motion constraints before assembling the full machine.',
      },
      action: {
        h2: 'Built subsystem models, the top-level assembly, and the drawing package.',
        body: 'Documented mechanical interfaces and motion constraints alongside the CAD.',
        chips: ['CAD', 'Hydraulics', 'Motion', 'Drawings'],
      },
      result: {
        h2: 'CAD that moves like the original machine.',
        body: 'Top-level motion study closed. Available as a reference for downstream analysis.',
      },
    },
  },
  {
    title: 'SBIR Proposal & Go-to-Market Strategy',
    category: 'Business Development',
    description:
      'Owned proposal work for an NSIC SBIR submission on a photonics anti-jam product. Compliance scrub plus dual-use commercialization narrative.',
    tags: ['SBIR', 'Dual-Use Strategy', 'Go-to-Market', 'Defense'],
    details:
      'Scrubbed the draft against the solicitation, translated technical performance into evaluable proposal language, and built the dual-use go-to-market argument used in pitch material.',
    gradient: 'linear-gradient(135deg, #d1fae5, #bfdbfe)',
    role: 'Business Development Intern',
    timeframe: '2025',
    facts: [
      { k: 'Category', v: 'Business Dev' },
      { k: 'Role', v: 'BD intern' },
      { k: 'Employer', v: 'CFD' },
      { k: 'Instrument', v: 'NSIC SBIR' },
      { k: 'Domain', v: 'Photonics anti-jam' },
      { k: 'Output', v: 'Proposal + pitch deck' },
    ],
    star: {
      problem: {
        h2: 'Technical performance data, no proposal-ready submission.',
        body: 'The team had performance reports. The draft needed compliance fixes and a commercialization story an NSIC reviewer could score.',
      },
      approach: {
        h2: 'Compliance first, narrative second.',
        body: 'Aligned against the solicitation before touching the story. Then framed the same product as a defense story and a commercial story without contradiction.',
      },
      action: {
        h2: 'Rewrote technical performance into evaluable language and built the GTM argument.',
        body: 'Produced the pitch deck content the CTO used live.',
        chips: ['SBIR', 'Dual-use', 'Pitch deck', 'Compliance'],
      },
      result: {
        h2: 'Compliant submission with a defensible commercial story.',
        body: 'Positioning content reused in downstream pitch material.',
      },
    },
  },
  {
    title: 'Product & Technology Roadmapping Project',
    category: 'Software',
    description:
      'Python tool that parses Excel templates and renders technology, capability, and product roadmaps on one timeline.',
    tags: ['Python', 'Roadmapping', 'Data Visualization', 'Excel'],
    details:
      'Excel stays the authoring surface. Python parses the templates and renders the layered roadmap with risk, budget, and schedule overlays sharing the same time axis.',
    gradient: 'linear-gradient(135deg, #e0e7ff, #ddd6fe)',
    role: 'Developer',
    timeframe: '2025',
    facts: [
      { k: 'Category', v: 'Software' },
      { k: 'Role', v: 'Developer' },
      { k: 'Input', v: 'Excel templates' },
      { k: 'Output', v: 'Roadmap charts' },
      { k: 'Layers', v: 'Tech · capability · product' },
      { k: 'Overlays', v: 'Risk · budget · schedule' },
    ],
    star: {
      problem: {
        h2: 'Roadmaps lived in separate Excel files with no shared time axis.',
        body: 'Tech, capability, and product roadmaps were authored independently. Investor decks were rebuilt by hand each round.',
      },
      approach: {
        h2: 'Keep Excel as the authoring surface. Render in Python.',
        body: 'Built a parser for the existing templates and rendered a layered timeline with risk, budget, and schedule overlays sharing one time axis.',
      },
      action: {
        h2: 'Wrote the parser, the schema, and the chart generator.',
        body: 'Wired all three layers and the overlays to the same time axis.',
        chips: ['Python', 'Excel parse', 'Time axis', 'Overlays'],
      },
      result: {
        h2: 'Roadmap pulls straight from the source templates.',
        body: 'Strategic reviews and investor conversations no longer maintain a separate deck.',
      },
    },
  },
  {
    title: 'FOM Analysis and Modeling Project',
    category: 'Data Analysis',
    description:
      'Modeling tool that plots product figures of merit against a state-of-the-art trend, projected to a target launch date.',
    tags: ['FOM', 'SOTA Analysis', 'Modeling', 'Competitive Benchmarking'],
    details:
      'Compiled competitor spec datasets, derived FOMs per market, and fit a SOTA trend line projected to the product launch window. Used to argue competitiveness internally.',
    gradient: 'linear-gradient(135deg, #fef9c3, #dbeafe)',
    role: 'Analyst',
    timeframe: '2025',
    facts: [
      { k: 'Category', v: 'Data Analysis' },
      { k: 'Role', v: 'Analyst' },
      { k: 'Input', v: 'Competitor specs' },
      { k: 'Output', v: 'FOM vs. SOTA charts' },
      { k: 'Purpose', v: 'Competitiveness framing' },
    ],
    star: {
      problem: {
        h2: 'Competitor spec sheets do not answer "competitive at launch?"',
        body: 'Need figures of merit plotted against a moving SOTA boundary projected to the launch date.',
      },
      approach: {
        h2: 'Derive FOMs per market and fit a SOTA trend.',
        body: 'Pulled competitor datasets. Derived figures of merit. Fit a trend line that projects SOTA forward to the product launch window.',
      },
      action: {
        h2: 'Built the dataset, the plotting tool, and the supporting analysis.',
        body: 'Used in internal reviews to argue competitiveness against a documented baseline.',
        chips: ['FOM', 'SOTA boundary', 'Trend fit', 'Benchmarking'],
      },
      result: {
        h2: 'Single chart shows whether the product lands on the right side of the SOTA boundary at launch.',
        body: 'Stakeholders can read competitiveness off one figure instead of cross-referencing spec tables.',
      },
    },
  },
];

// Titles that should show up in the "Featured Projects" grid on the main
// site. The rest still live in the /projects/ catalog.
const featuredTitles = new Set([
  '5 DoF AprilTag Robotic Arm',
  'Menzi Muck M220x Reverse Engineering',
  'FOM Analysis and Modeling Project',
  'Multi-Up Wire Bonding Fixture',
  'RF Chip-and-Wire Layouts',
  'PIC Probing Station',
  'Camera Telemetry Stabilization',
  'SBIR Proposal & Go-to-Market Strategy',
]);

export const projects = rawProjects.map((p) => ({
  ...p,
  slug: slugify(p.title),
  featured: featuredTitles.has(p.title),
}));

export const featuredProjects = projects.filter((p) => p.featured);
