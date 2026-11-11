import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuLinks } from "./content";
import { Lockup } from "./Logo";

export default function Home() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    document.documentElement.classList.add("has-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => io.observe(node));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("has-reveal");
    };
  }, [pathname]);

  return (
    <>
      <section className="landing">
        <a className="landing-mark" href="#pregled" aria-label="Nastavite na pregled">
          <Lockup />
        </a>
      </section>

      <section className="overview" id="pregled">
        <h1 className="reveal">
          Vjenčanja i
          <br />
          događanja
        </h1>
        <nav className="overview-nav reveal">
          {menuLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
