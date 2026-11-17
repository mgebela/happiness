import { useLayoutEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Lockup, Logo } from "./Logo";
import { Seo } from "./seo";
import { useReveal } from "./useReveal";

const backTo = { pathname: "/", hash: "#pregled" } as const;

export function BackLink({ className = "" }: { className?: string }) {
  return (
    <Link className={`back-link${className ? ` ${className}` : ""}`} to={backTo}>
      <svg className="back-link-icon" viewBox="0 0 28 12" aria-hidden="true">
        <path d="M6 1 L1 6 L6 11 M1 6 H27" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      Natrag
    </Link>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <BackLink className="site-header-back" />
      <Link className="site-header-brand" to={backTo} aria-label="Happiness by Tihana, natrag na pregled">
        <Lockup compact />
      </Link>
    </header>
  );
}

export function ScrollTop() {
  const { pathname, hash } = useLocation();
  const firstLoad = useRef(true);

  useLayoutEffect(() => {
    const openingHome = firstLoad.current && pathname === "/";
    firstLoad.current = false;

    let frame = 0;
    let tries = 0;

    const go = () => {
      if (openingHome) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
        if (tries++ < 16) {
          frame = requestAnimationFrame(go);
        }
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    go();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const inner = pathname !== "/";
  useReveal();

  return (
    <div className={inner ? "site site-inner" : "site"}>
      <Seo />
      <a className="skip-link" href="#sadrzaj">
        Preskočite na sadržaj
      </a>
      {inner && <SiteHeader />}

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
