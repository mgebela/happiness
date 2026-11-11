import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  useReveal();

  return (
    <div className="site">
      <a className="skip-link" href="#sadrzaj">
        Preskočite na sadržaj
      </a>

      <div id="sadrzaj">
        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer-top">
          <div className="reveal">
            <p className="label">Studio</p>
            <p>
              Happiness by Tihana
              <br />
              Franjevačka 1b
              <br />
              31000 Osijek
            </p>
          </div>
          <div className="reveal">
            <p className="label">Kontakt</p>
            <p>
              <a href="tel:+385911601974">091 160 1974</a>
              <br />
              <a href="mailto:tihana@studio-happiness.hr">tihana@studio-happiness.hr</a>
            </p>
          </div>
          <div className="reveal">
            <p className="label">Instagram</p>
            <p>
              <a href="https://instagram.com/happinessytihana" target="_blank" rel="noreferrer">
                @happinessytihana
              </a>
            </p>
          </div>
          <div className="reveal">
            <Logo invert mark={false} />
          </div>
        </div>
        <div className="footer-bottom reveal">
          <p>
            Studio Happiness · Osijek · All about <em>events</em>
          </p>
        </div>
      </footer>
    </div>
  );
}
