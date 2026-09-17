import { useEffect } from "react";
import { profile } from "./data.js";
import "./linktree.css";

const links = [
  { title: "Portfolio", detail: "Explore the full site", href: "/" },
  { title: "Featured projects", detail: "Engineering case studies", href: "/#projects" },
  { title: "LinkedIn", detail: "Connect professionally", href: profile.linkedin, external: true },
  { title: "Email", detail: "Tararajoshua@gmail.com", href: profile.email },
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
            <span className="linktree-copy"><span className="linktree-title">{link.title}</span><span className="linktree-detail">{link.detail}</span></span>
            <span className="linktree-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
      <p className="linktree-footer"><a href="/">© 2026 Joshua Tarara</a></p>
    </main>
  );
}
