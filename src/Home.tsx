import { Link } from "react-router-dom";
import { menuLinks } from "./content";
import { Lockup } from "./Logo";

export default function Home() {
  return (
    <>
      <section className="landing">
        <a className="landing-mark" href="#pregled" aria-label="Nastavite na pregled">
          <Lockup invert mark={false} />
        </a>
      </section>

      <section className="overview" id="pregled">
        <h1 className="reveal">
          Vjenčanja i
          <br />
          događanja
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
