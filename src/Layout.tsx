import { useEffect, useLayoutEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { menuLinks } from "./content";
import { Logo } from "./Logo";
import { useReveal } from "./useReveal";

export function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const [pastLanding, setPastLanding] = useState(!isHome);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const update = () => {
      setPastLanding(!isHome || window.scrollY > window.innerHeight * 0.55);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname, isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useReveal();

  const showMark = menuOpen || pastLanding;
  const onSageHero = isHome && !pastLanding && !menuOpen;

  return (
    <div className="site">
      <a className="skip-link" href="#sadrzaj">
        Preskočite na sadržaj
      </a>

      <header
        className={`nav${menuOpen ? " is-open" : ""}${showMark ? " is-scrolled" : ""}${onSageHero ? " is-hero" : ""}`}
      >
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-label="Izbornik"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <Logo compact invert={menuOpen || onSageHero} />
        <Link className="nav-contact" to="/upit">
          Upit
        </Link>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <nav>
            {menuLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="menu-meta">
            <a href="mailto:tihana@studio-happiness.hr">tihana@studio-happiness.hr</a>
            <a href="tel:+385911601974">091 160 1974</a>
          </p>
        </div>
      )}

      <div id="sadrzaj">
        <Outlet />
      </div>
    </div>
  );
}
