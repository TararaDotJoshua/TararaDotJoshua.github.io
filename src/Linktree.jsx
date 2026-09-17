import { useEffect } from "react";
import { profile } from "./data.js";
import "./linktree.css";

const links = [
  { title: "Portfolio Website", href: "/" },
  { title: "Featured Projects", href: "/#projects" },
  { title: "LinkedIn · Tararajoshua", href: "https://linkedin.com/in/tararajoshua", external: true },
  { title: "GitHub · TararadotJoshua", href: "https://github.com/TararadotJoshua", external: true },
  { title: "Email · Tararajoshua@gmail.com", href: profile.email },
];

export function Linktree() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Joshua Tarara — Links";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="linktree-page">
      <section className="linktree-identity" aria-label="Joshua Tarara">
        <span className="linktree-portrait"><img src="/assets/headshot.png" alt="Joshua Tarara" /></span>
        <h1>Joshua Tarara</h1>
        <p className="linktree-role">{profile.label}</p>
        <p className="linktree-location">Boston, MA + Space Coast, FL</p>
      </section>
      <nav className="linktree-links" aria-label="Joshua Tarara links">
        {links.map((link) => (
          <a className="linktree-link" href={link.href} key={link.title} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
            <span className="linktree-title">{link.title}</span>
            <span className="linktree-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg></span>
          </a>
        ))}
      </nav>
      <p className="linktree-footer"><a href="/">© 2026 Joshua Tarara</a></p>
    </main>
  );
}
