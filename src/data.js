export const profile = {
  name: "Joshua Tarara",
  label: "Mechanical Engineering Student",
  statement: "Specializing in mechanical designs for DoW microelectronics, embedded systems, and avionics. Experience in VITA-spec housing, RF layouts, and precision fixturing with research interests in UAS and optomechanical design.",
  email: "mailto:Tararajoshua@gmail.com",
  linkedin: "https://linkedin.com/in/tararajoshua",
};

export const projects = [
  ["01", "VITA Spec 3U VPX Housing", "Defense systems", "Modular ESD-safe enclosures deployed across four defense programs.", "/projects/vita-spec-3u-vpx-housing-design.html"],
  ["02", "RF Chip-and-Wire Layouts", "RF design", "10+ layouts and a shared component library for defense microelectronics.", "/projects/rf-chip-and-wire-layouts.html"],
  ["03", "PIC Probing Station", "Mechatronics", "Automated cubic-spiral optical alignment for photonic integrated circuits.", "/projects/pic-probing-station.html"],
  ["04", "Camera Telemetry Stabilization", "Computer vision", "AprilTag pose estimation for target-relative drone station-keeping.", "/projects/camera-telemetry-stabilization.html"],
].map(([index, title, category, detail, href]) => ({ index, title, category, detail, href }));

export const experience = [
  { timeframe: "Sep 2026 – Present", role: "Mechanical Engineering Co-Op", company: "L3Harris", summary: "Mechanical design · engineering development · production support" },
  { timeframe: "May 2026 – Jul 2026", role: "Mechanical Engineering Intern", company: "L3Harris", summary: "Digital twins · thermal simulation · CAD/PDM automation" },
  { timeframe: "May 2025 – Aug 2025", role: "Mechanical Engineering Intern", company: "Critical Frequency Design", summary: "VITA housings · PIC probing · SBIR roadmaps" },
  { timeframe: "May 2023 – Jul 2024", role: "Mechanical Engineering Intern", company: "Mercury Systems", summary: "20+ fixtures · 10+ RF layouts · DoW qualification" },
  { timeframe: "Oct 2022 – Mar 2023", role: "Student & Mentor", company: "BAE Systems · FOCUS Program", summary: "Program participant · first place · returning mentor" },
  { timeframe: "Oct 2022 – Feb 2023", role: "Inventory Logistics Intern", company: "Scott Electronics", summary: "Inventory logistics · SQL · just-in-time operations" },
];

export const capabilities = [
  { title: "CAD + Design", items: ["SolidWorks", "Creo 11", "NX", "AutoCAD", "KiCAD", "Altium CoDesigner", "Onshape", "SolidWorks PDM"] },
  { title: "Analysis + Simulation", items: ["ANSYS FEA", "ANSYS Thermal", "SolidWorks Simulation", "MATLAB"] },
  { title: "Manufacturing + Fixturing", items: ["Sub-micron fixturing", "Wire-bonding fixtures", "FDM", "SLA", "SLS", "CNC mill", "Manual lathe"] },
  { title: "Robotics + Controls", items: ["Computer vision", "AprilTag", "PID", "Optical alignment", "UAS systems", "Mechatronics", "Sensor integration"] },
  { title: "Programming", items: ["Python", "C++", "C#", "MATLAB", "SQL", "VBA", "CAD automation", "Agentic AI coding"] },
  { title: "PCB + Electronics", items: ["PCB enclosure design", "Soldering", "RF lab work", "Fiber optics", "VITA spec design"] },
];

export const education = {
  degree: "B.S. Mechanical Engineering",
  school: "Florida Institute of Technology",
  timeframe: "2024–2028 · Expected",
  coursework: ["Robotics + Control Systems", "Thermodynamics", "Machine Design", "Manufacturing Processes", "Materials Science", "CAD/CAM", "Technology Roadmapping", "Agile Project Management"],
  awards: ["AMF Certification", "Eagle Scout", "New England Excellence in Engineering", "District Excellence in Engineering", "2× SkillsUSA State Champion"],
};
