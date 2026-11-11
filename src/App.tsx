import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import { Logo, Mark } from "./Logo";

const base = import.meta.env.BASE_URL;
const photo = (name: string) => `${base}photos/${name}`;

const services = [
  {
    id: "organizacija",
    kicker: "01",
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
    kicker: "02",
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
    kicker: "03",
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
    kicker: "04",
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
    kicker: "05",
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
    kicker: "06",
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
    quote: "Trenuci koji se pamte cijeli život",
    kicker: "Vatromet",
  },
  {
    src: "gallery-03.jpg",
    alt: "Par uz kabriolet u vinogradu",
    position: "center 55%",
    quote: "Svaka priča zaslužuje pažnju",
    kicker: "Vjenčanja",
  },
  {
    src: "gallery-01.jpg",
    alt: "Ples na proslavi, narančasta satenska haljina",
    position: "center 32%",
    quote: "Atmosfera, ritam i radost",
    kicker: "Proslava",
  },
  {
    src: "gallery-05.jpg",
    alt: "Mlada i djeveruše nazdravljaju",
    position: "center 40%",
    quote: "Najljepši dio su ljudi i njihove priče",
    kicker: "Druženje",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => io.observe(node));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("has-reveal");
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function onInquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="site" id="pocetak">
      <a className="skip-link" href="#o-meni">
        Preskočite na sadržaj
      </a>
      <header className={`nav${menuOpen ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <span className="nav-side" />
        <Logo compact />
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-label="Izbornik"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
        </button>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <nav>
            <a href="#o-meni" onClick={closeMenu}>
              O meni
            </a>
            <a href="#usluge" onClick={closeMenu}>
              Usluge
            </a>
            <div className="menu-services">
              {services.map((service) => (
                <a key={service.id} href={`#${service.id}`} onClick={closeMenu}>
                  {service.nav}
                </a>
              ))}
            </div>
            <a href="#trenuci" onClick={closeMenu}>
              Trenuci
            </a>
            <a href="#kontakt" onClick={closeMenu}>
              Upit
            </a>
          </nav>
        </div>
      )}

      <section className="hero">
        <img
          className="hero-poster"
          src={photo("hero-poster.jpg")}
          alt="Vjenčanje na otvorenom — ceremonija, gosti i proslava"
        />
        <video
          className="hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={photo("hero-poster.jpg")}
          aria-hidden="true"
        >
          <source src={photo("hero.mp4")} type="video/mp4" />
        </video>
        <div className="hero-brand">
          <Logo />
        </div>
        <div className="hero-caption">
          <h1>Vjenčanja i događanja koja se pamte</h1>
          <a className="btn btn-light" href="#kontakt">
            Započnite priču
          </a>
        </div>
      </section>

      <section className="manifesto reveal" id="o-meni">
        <p className="eyebrow">Studio Happiness · Osijek</p>
        <h2>Svaka priča zaslužuje pažnju</h2>
        <div className="manifesto-copy">
          <p>
            Ja sam Tihana Tomljanović, osnivačica Studija Happiness iz Osijeka. Već više od 15 godina
            moj posao je stvarati vjenčanja i događanja koja ljudi pamte cijeli život. Iza mene su
            brojni projekti, od intimnih ceremonija do privatnih i poslovnih evenata, ali ono što mi
            je uvijek najvažnije su zadovoljni klijenti i odnos koji s njima gradim kroz cijeli
            proces.
          </p>
          <p>
            Svaki događaj za mene je nova priča. Upravo zato svakom paru ili klijentu pristupam
            individualno, s puno pažnje prema detaljima i atmosferi koju zajedno stvaramo.
            Povjerenje, otvorena komunikacija i dobra energija temelj su svake uspješne suradnje.
          </p>
          <p>Najljepši dio mog posla su ljudi i njihove priče.</p>
        </div>
        <figure className="feature-photo">
          <img src={photo("tihana.jpg")} alt="Tihana Tomljanović vodi simboličnu ceremoniju pod cvjetnim lukom" />
        </figure>
      </section>

      <section className="services-intro reveal" id="usluge">
        <p className="eyebrow">Usluge</p>
        <h2>Od ideje do dana događaja</h2>
      </section>

      {services.map((service, index) => (
        <section
          className={`chapter reveal${index % 2 ? " is-reverse" : ""}`}
          id={service.id}
          key={service.id}
        >
          <figure className="feature-photo">
            <img
              src={photo(service.image)}
              alt={service.alt}
              style={{ objectPosition: service.position }}
            />
          </figure>
          <div className="chapter-copy">
            <p className="eyebrow">{service.kicker}</p>
            <h2>{service.title}</h2>
            {service.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="moments" id="trenuci">
        <p className="eyebrow">Trenuci</p>
        <h2 className="reveal">Priče koje smo već ispričali</h2>
        <div className="moment-stack">
          {moments.map((item) => (
            <figure key={item.src} className="moment-card">
              <img src={photo(item.src)} alt={item.alt} style={{ objectPosition: item.position }} />
              <figcaption>
                <h3>{item.quote}</h3>
                <p>{item.kicker}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="enquire reveal" id="kontakt">
        <p className="eyebrow">Upit</p>
        <h2>Priča počinje ovdje</h2>
        <p className="enquire-lede">
          Javite se za vjenčanje, ceremoniju, event ili konzultacije. Odgovaram osobno.
        </p>
        <div className="enquire-grid">
          <ul className="contact-list">
            <li>
              <span className="label">Telefon</span>
              <a href="tel:+385911601974">091 160 1974</a>
            </li>
            <li>
              <span className="label">E-mail</span>
              <a href="mailto:tihana@studio-happiness.hr">tihana@studio-happiness.hr</a>
            </li>
            <li>
              <span className="label">Instagram</span>
              <a href="https://instagram.com/happinessytihana" target="_blank" rel="noreferrer">
                @happinessytihana
              </a>
            </li>
            <li>
              <span className="label">Studio</span>
              Franjevačka 1b, 31000 Osijek
            </li>
          </ul>
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
              <button className="btn" type="submit" onClick={() => setSent(true)}>
                Pošaljite upit
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="footer reveal">
        <nav>
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`}>
              {service.nav}
            </a>
          ))}
          <a href="#o-meni">O meni</a>
          <a href="#kontakt">Upit</a>
        </nav>
        <p>Studio Happiness · Osijek · All about events</p>
      </footer>
    </div>
  );
}
