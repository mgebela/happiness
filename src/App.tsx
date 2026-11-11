import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import { Mark, Wordmark } from "./Logo";

const base = import.meta.env.BASE_URL;
const photo = (name: string) => `${base}photos/${name}`;

const services = [
  {
    id: "organizacija",
    nav: "Organizacija",
    title: "Organizacija vjenčanja",
    image: "vjencanja.jpg",
    position: "center 48%",
    alt: "Mlada se okreće prema kameri, mladoženja stoji u parku",
    paragraphs: [
      "Ako želite potpuno bezbrižan proces planiranja, tu smo od prve ideje. Pomažem u odabiru lokacije, izvođača i svih važnih detalja, izrađujemo koncept i plan vjenčanja te koordiniram sve uključene. Vi donosite odluke, a ja brinem da se sve realizira bez stresa.",
    ],
  },
  {
    id: "koordinacija",
    nav: "Koordinacija",
    title: "Koordinacija vjenčanja",
    image: "service-koordinacija.jpg",
    position: "center 28%",
    alt: "Priprema lounge kutka na dan događaja",
    paragraphs: [
      "Koordinacija je za parove koji su već organizirali većinu vjenčanja, a žele profesionalnu podršku u završnoj fazi i na sam dan. Zajedno prolazimo detalje, izrađujemo jasan protokol i raspored, a na dan vjenčanja koordiniram uzvanike i izvođače. Vaše je samo da uživate.",
    ],
  },
  {
    id: "maticar",
    nav: "Simbolični matičar",
    title: "Simbolični matičar",
    image: "service-maticar.jpg",
    position: "center 46%",
    alt: "Ceremonija uz jezero, mladenka i mladoženja pod bijelim suncobranima",
    paragraphs: [
      "Simbolična ceremonija daje vam slobodu da vjenčanje oblikujete onako kako želite — u prirodi, vinogradu, parku ili mjestu koje za vas ima značenje. Svaka je personalizirana i prilagođena vašoj priči.",
      "Uz osobne zavjete, glazbu i pažljivo osmišljen govor, često postaje najemotivniji trenutak dana. Ceremoniju vodim i na engleskom jeziku.",
    ],
  },
  {
    id: "konzultacije",
    nav: "Konzultacije",
    title: "Konzultacije",
    image: "gallery-04.jpg",
    position: "center 42%",
    alt: "Cvjetni detalj ceremonije — pampas, dalije i hortenzije",
    paragraphs: [
      "Konzultacije su za parove koji žele sami organizirati vjenčanje, uz stručne smjernice. Na sastanku prolazimo lokaciju, izvođače, raspored dana i budžet. Dobijete jasne odgovore i praktične savjete. Vi organizirate, a ja vas usmjeravam kroz proces.",
    ],
  },
  {
    id: "moderacija",
    nav: "Moderacija",
    title: "Moderacija događanja",
    image: "service-moderacija.jpg",
    position: "center 42%",
    alt: "Par na proslavi gleda vatromet, ruke u zraku",
    paragraphs: [
      "Zahvaljujući godinama rada na radiju, moderacija mi je prirodan dio posla. Vodim programe, predstavljam sudionike i brinem da događaj ima dobar ritam, jasnu komunikaciju i ugodnu atmosferu. Dobra moderacija povezuje cijeli događaj u jednu cjelinu.",
    ],
  },
  {
    id: "eventi",
    nav: "Eventi",
    title: "Organizacija evenata",
    image: "dogadanja.jpg",
    position: "center 58%",
    alt: "Lounge kutak na otvorenom, drvene klupe i bijeli jastuci",
    paragraphs: [
      "Osim vjenčanja, Studio Happiness organizira privatna i poslovna događanja — od ideje i koncepta do realizacije. Cilj je događaj s jasnom pričom, dobrom atmosferom i profesionalnom organizacijom, bilo da se radi o proslavi, korporativnom eventu ili posebnoj prilici.",
    ],
  },
];

const moments = [
  {
    src: "gallery-02.jpg",
    alt: "Poljubac pod vatrometom",
    position: "center 78%",
  },
  {
    src: "gallery-03.jpg",
    alt: "Par uz kabriolet u vinogradu",
    position: "center 55%",
  },
  {
    src: "gallery-01.jpg",
    alt: "Ples na proslavi, narančasta satenska haljina",
    position: "center 32%",
  },
  {
    src: "gallery-05.jpg",
    alt: "Mlada i djeveruše nazdravljaju",
    position: "center 40%",
  },
];

const menuLinks = [
  { href: "#o-meni", label: "O meni" },
  ...services.map((service) => ({ href: `#${service.id}`, label: service.nav })),
  { href: "#trenuci", label: "Trenuci" },
  { href: "#kontakt", label: "Upit" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [pastLanding, setPastLanding] = useState(false);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const landing = document.querySelector(".landing");
    const film = document.querySelector(".film");
    if (!landing) return;

    const update = () => {
      setPastLanding(window.scrollY > window.innerHeight * 0.55);
      const y = window.innerHeight * 0.12;
      const dark = [landing, film].some((node) => {
        if (!node) return false;
        const box = node.getBoundingClientRect();
        return box.top < y && box.bottom > y;
      });
      setOnDark(dark || menuOpen);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const nodes = Array.from(document.querySelectorAll(".reveal"));
    if (!nodes.length) return;

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
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function onInquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const navTone = menuOpen || onDark ? " is-light" : "";

  return (
    <div className="site" id="pocetak">
      <a className="skip-link" href="#pregled">
        Preskočite na sadržaj
      </a>

      <header className={`nav${menuOpen ? " is-open" : ""}${pastLanding ? " is-scrolled" : ""}${navTone}`}>
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
        <Wordmark />
        <a className="nav-contact" href="#kontakt" onClick={closeMenu}>
          Upit
        </a>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <nav>
            {menuLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>
          <p className="menu-meta">
            <a href="mailto:tihana@studio-happiness.hr">tihana@studio-happiness.hr</a>
            <a href="tel:+385911601974">091 160 1974</a>
          </p>
        </div>
      )}

      <section className="landing">
        <a className="landing-mark" href="#pregled">
          <span>happiness</span>
          <em>by tihana</em>
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
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="film" aria-label="Filmski trenutak vjenčanja">
        <img
          className="hero-poster"
          src={photo("hero-poster.jpg")}
          alt="Vjenčanje na otvorenom — ceremonija, gosti i proslava"
        />
        <video className="hero-media" autoPlay muted loop playsInline preload="auto" poster={photo("hero-poster.jpg")} aria-hidden="true">
          <source src={photo("hero.mp4")} type="video/mp4" />
        </video>
      </section>

      <section className="prose reveal" id="o-meni">
        <p className="label">O meni</p>
        <p className="lede">
          Ja sam Tihana Tomljanović, osnivačica Studija Happiness iz Osijeka. Već više od 15 godina
          moj posao je stvarati vjenčanja i događanja koja ljudi pamte cijeli život.
        </p>
        <p className="lede">
          Iza mene su brojni projekti, od intimnih ceremonija do privatnih i poslovnih evenata, ali
          ono što mi je uvijek najvažnije su zadovoljni klijenti i odnos koji s njima gradim kroz
          cijeli proces.
        </p>
        <p className="lede">
          Svaki događaj za mene je nova priča. Upravo zato svakom paru ili klijentu pristupam
          individualno, s puno pažnje prema detaljima i atmosferi koju zajedno stvaramo. Povjerenje,
          otvorena komunikacija i dobra energija temelj su svake uspješne suradnje.
        </p>
        <p className="lede">Najljepši dio mog posla su ljudi i njihove priče.</p>
      </section>

      <figure className="portrait reveal">
        <img src={photo("tihana.jpg")} alt="Tihana Tomljanović vodi simboličnu ceremoniju pod cvjetnim lukom" />
      </figure>

      {services.map((service) => (
        <section className="service" id={service.id} key={service.id}>
          <div className="prose reveal">
            <p className="label">{service.title}</p>
            {service.paragraphs.map((text) => (
              <p className="lede" key={text.slice(0, 28)}>
                {text}
              </p>
            ))}
          </div>
          <figure className="bleed">
            <img src={photo(service.image)} alt={service.alt} style={{ objectPosition: service.position }} />
          </figure>
        </section>
      ))}

      <section className="moments" id="trenuci">
        <div className="prose reveal">
          <p className="label">Trenuci</p>
          <p className="lede">Priče koje smo već ispričali.</p>
        </div>
        <div className="strip">
          {moments.map((item) => (
            <figure key={item.src}>
              <img src={photo(item.src)} alt={item.alt} style={{ objectPosition: item.position }} />
            </figure>
          ))}
        </div>
      </section>

      <section className="enquire reveal" id="kontakt">
        <p className="label">Upit</p>
        <p className="lede">
          Javite se za vjenčanje, ceremoniju, event ili konzultacije. Odgovaram osobno.
        </p>
        {sent ? (
          <div className="thanks">
            <Mark />
            <h3>Hvala vam.</h3>
            <p>Poruka je zabilježena. Javit ću se čim povežemo pravi inbox.</p>
          </div>
        ) : (
          <form onSubmit={onInquire} noValidate>
            <label>
              Ime i prezime
              <input name="name" required placeholder="Vaše ime" />
            </label>
            <label>
              E-mail
              <input name="email" type="email" required placeholder="vas@email.com" />
            </label>
            <label>
              Usluga
              <select name="service" defaultValue="organizacija">
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Datum
              <input name="date" type="date" />
            </label>
            <label className="full">
              Poruka
              <textarea name="note" required placeholder="Lokacija, broj gostiju, što vam je važno…" />
            </label>
            <button className="text-cta" type="submit" onClick={() => setSent(true)}>
              Pošaljite upit
            </button>
          </form>
        )}
      </section>

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
          <Wordmark href="#pocetak" />
        </div>
        <div className="footer-bottom">
          <p>Studio Happiness · Osijek · All about events</p>
        </div>
      </footer>
    </div>
  );
}
