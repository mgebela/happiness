import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Seo } from "./seo";
import { useReveal } from "./useReveal";

export function ScrollTop() {
  const { pathname, hash } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    const openingHome = firstLoad.current && pathname === "/";
    firstLoad.current = false;

    const go = () => {
      if (openingHome) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView();
          return;
        }
      }
      window.scrollTo(0, 0);
    };

    go();
    const frame = requestAnimationFrame(go);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  useReveal();

  return (
    <div className="site">
      <Seo />
      <a className="skip-link" href="#sadrzaj">
        Preskočite na sadržaj
      </a>

      <main id="sadrzaj">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-bar">
          <div className="footer-cols">
            <div>
              <p className="label">Adresa</p>
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
                <a href="mailto:tihana@studio-happiness.hr">tihana@studio-happiness.hr</a>
                <br />
                <a href="tel:+385911601974">091 160 1974</a>
              </p>
            </div>
            <div>
              <p className="label">Instagram</p>
              <p>
                <a href="https://www.instagram.com/happinessbytihana" target="_blank" rel="noreferrer">
                  @happinessbytihana
                </a>
              </p>
            </div>
          </div>
          <Logo invert mark={false} />
        </div>
      </footer>
    </div>
  );
}
