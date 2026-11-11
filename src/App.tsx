import { FormEvent, useEffect, useState } from "react";
import { Logo, Mark } from "./Logo";

const base = import.meta.env.BASE_URL;
const photo = (name: string) => `${base}photos/${name}`;

const chapters = [
  {
    id: "vjencanja",
    kicker: "Organizacija i koordinacija",
    title: "Vjenčanja",
    image: "vjencanja.jpg",
    alt: "Mlada se okreće prema kameri, mladoženja stoji u parku",
    paragraphs: [
      "Ako želite potpuno bezbrižan proces, tu smo od prve ideje. Pomažem u odabiru lokacije, izvođača i svih važnih detalja, izrađujemo koncept i plan vjenčanja te koordiniram sve uključene. Vi donosite odluke, a ja brinem da se sve realizira bez stresa.",
      "Za parove koji su već organizirali većinu dana, tu sam u završnoj fazi i na sam dan. Zajedno prolazimo detalje, izrađujemo jasan protokol i raspored, a na dan vjenčanja koordiniram uzvanike i izvođače. Vaše je samo da uživate.",
    ],
    more: "Konzultacije su tu za parove koji žele sami organizirati vjenčanje, uz stručne smjernice. Na sastanku prolazimo lokaciju, izvođače, raspored dana i budžet. Vi organizirate, a ja vas usmjeravam kroz proces.",
  },
  {
    id: "ceremonije",
    kicker: "Simbolični matičar",
    title: "Ceremonije",
    image: "service-maticar.jpg",
    alt: "Ceremonija uz jezero, mladenka i mladoženja pod bijelim suncobranima",
    paragraphs: [
      "Simbolična ceremonija daje vam slobodu da vjenčanje oblikujete onako kako želite — u prirodi, vinogradu, parku ili mjestu koje za vas ima značenje.",
      "Uz osobne zavjete, glazbu i pažljivo osmišljen govor, često postaje najemotivniji trenutak dana. Ceremoniju vodim i na engleskom jeziku.",
    ],
  },
  {
    id: "dogadanja",
    kicker: "Eventi i moderacija",
    title: "Događanja",
    image: "dogadanja.jpg",
    alt: "Lounge kutak na otvorenom, drvene klupe i bijeli jastuci",
    paragraphs: [
      "Osim vjenčanja, Studio Happiness organizira privatna i poslovna događanja — od ideje i koncepta do realizacije. Cilj je događaj s jasnom pričom, dobrom atmosferom i profesionalnom organizacijom.",
      "Zahvaljujući godinama rada na radiju, moderacija mi je prirodan dio posla. Vodim programe, predstavljam sudionike i brinem da događaj ima dobar ritam i ugodnu atmosferu.",
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
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("kontakt");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(form);
    return () => observer.disconnect();
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
            <a href="#vjencanja" onClick={closeMenu}>
              Vjenčanja
            </a>
            <a href="#ceremonije" onClick={closeMenu}>
              Ceremonije
            </a>
            <a href="#dogadanja" onClick={closeMenu}>
              Događanja
            </a>
            <a href="#kontakt" onClick={closeMenu}>
              Upit
            </a>
          </nav>
        </div>
      )}

      <section className="hero">
        <img src={photo("hero.jpg")} alt="Mladenci u vinogradu u zlatnom svjetlu" />
        <div className="hero-brand">
          <Logo />
        </div>
        <div className="hero-caption">
          <h1>Vjenčanja i događanja koja se pamte</h1>
        </div>
      </section>

      <section className="manifesto" id="o-meni">
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

      {chapters.map((chapter) => (
        <section className="chapter" id={chapter.id} key={chapter.id}>
          <figure className="feature-photo">
            <img src={photo(chapter.image)} alt={chapter.alt} />
          </figure>
          <div className="chapter-copy">
            <p className="eyebrow">{chapter.kicker}</p>
            <h2>{chapter.title}</h2>
            {chapter.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
            {chapter.more && (
              <>
                <button
                  className="text-link"
                  onClick={() =>
                    setOpenChapter((current) => (current === chapter.id ? null : chapter.id))
                  }
                >
                  {openChapter === chapter.id ? "Zatvorite" : "Saznajte više"}
                </button>
                {openChapter === chapter.id && <p className="more">{chapter.more}</p>}
              </>
            )}
          </div>
        </section>
      ))}

      <section className="moments" id="trenuci">
        <p className="eyebrow">Trenuci</p>
        <h2>Priče koje smo već ispričali</h2>
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

      <section className="enquire" id="kontakt">
        <p className="eyebrow">Upit</p>
        <h2>Priča počinje ovdje</h2>
        <p className="enquire-lede">
          Javite se za vjenčanje, ceremoniju ili event. Odgovaram osobno.
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
                <select name="service" defaultValue="vjencanja">
                  <option value="vjencanja">Vjenčanja</option>
                  <option value="ceremonije">Ceremonije</option>
                  <option value="dogadanja">Događanja</option>
                  <option value="konzultacije">Konzultacije</option>
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

      <a
        className={`contact-cloud${menuOpen || formInView ? " is-hidden" : ""}`}
        href="#kontakt"
        aria-label="Idite na obrazac za upit"
      >
        <svg className="contact-cloud-shape" viewBox="0 0 200 120" aria-hidden="true">
          <ellipse cx="58" cy="72" rx="38" ry="30" />
          <ellipse cx="100" cy="52" rx="46" ry="38" />
          <ellipse cx="144" cy="70" rx="36" ry="28" />
          <rect x="32" y="70" width="128" height="32" rx="16" />
        </svg>
        <span>Upit</span>
      </a>

      <footer className="footer">
        <nav>
          <a href="#vjencanja">Vjenčanja</a>
          <a href="#ceremonije">Ceremonije</a>
          <a href="#dogadanja">Događanja</a>
          <a href="#o-meni">O meni</a>
          <a href="#kontakt">Upit</a>
        </nav>
        <p>Studio Happiness · Osijek · All about events</p>
      </footer>
    </div>
  );
}
