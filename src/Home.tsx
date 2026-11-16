import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuLinks } from "./content";
import { Lockup } from "./Logo";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    const historyIndex = window.history.state?.idx ?? 0;
    if (historyIndex !== 0) return;
    if (hash && hash !== "#pregled") return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });
    window.addEventListener("keydown", cancel);

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("pregled")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
      });
    }, 2000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [hash]);

  return (
    <>
      <section className="landing">
        <a className="landing-mark" href="#pregled" aria-label="Nastavite na pregled">
          <Lockup invert />
        </a>
      </section>

      <section className="overview" id="pregled">
        <h1 className="reveal overview-title">
          <span className="overview-lead">Uspješni događaji ne nastaju slučajno.</span>
          <span className="overview-follow">Iza njih stoje ljudi, iskustvo i dobra organizacija.</span>
        </h1>
        <nav className="overview-nav">
          {menuLinks.map((link, index) => (
            <Link key={link.to} to={link.to} className="reveal" style={{ ["--delay" as string]: `${index * 55}ms` }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
