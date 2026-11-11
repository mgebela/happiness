import { useEffect, useLayoutEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { menuLinks } from "./content";
import { Logo } from "./Logo";

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
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const update = () => {
      const hero = document.querySelector(".hero-page");
      setPastLanding(!isHome || window.scrollY > window.innerHeight * 0.55);
      const y = window.innerHeight * 0.12;
      const heroBox = hero?.getBoundingClientRect();
      const overHero = Boolean(heroBox && heroBox.top < y && heroBox.bottom > y);
      setOnDark(overHero || menuOpen);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [menuOpen, location.pathname, isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navTone = menuOpen || onDark ? " is-light" : "";
  const showMark = menuOpen || pastLanding;

  return (
    <div className="site">
      <a className="skip-link" href="#sadrzaj">
        Preskočite na sadržaj
      </a>

      <header className={`nav${menuOpen ? " is-open" : ""}${showMark ? " is-scrolled" : ""}${navTone}`}>
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
        <Logo compact invert />
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

      <footer className="footer">
        <div className="footer-top">
          <div>
            <p className="label">Studio</p>
            <p>
              Happiness by Tihana
              <br />
              Franjevačka 1b
              <br />
              31000 Osijek
            </p>
          </div>
          <div>
            <p className="label">Kontakt</p>
            <p>
              <a href="tel:+385911601974">091 160 1974</a>
              <br />
              <a href="mailto:tihana@studio-happiness.hr">tihana@studio-happiness.hr</a>
            </p>
          </div>
          <div>
            <p className="label">Instagram</p>
            <p>
              <a href="https://instagram.com/happinessytihana" target="_blank" rel="noreferrer">
                @happinessytihana
              </a>
            </p>
          </div>
          <Logo invert />
        </div>
        <div className="footer-bottom">
          <p>
            Studio Happiness · Osijek · All about <em>events</em>
          </p>
        </div>
      </footer>
    </div>
  );
}
