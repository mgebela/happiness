import { FormEvent, useState } from "react";
import { Logo, Mark } from "./Logo";

const base = import.meta.env.BASE_URL;

const photo = (name: string) => `${base}photos/${name}`;

const services = [
  {
    id: "organizacija",
    title: "Organizacija vjenčanja",
    image: "service-organizacija.jpg",
    text: "Ako želite potpuno bezbrižan proces planiranja, tu smo od prve ideje. Pomažem u odabiru lokacije, izvođača i svih važnih detalja, izrađujemo koncept i plan vjenčanja te koordiniram sve uključene. Vi donosite odluke, a ja brinem da se sve realizira bez stresa.",
  },
  {
    id: "koordinacija",
    title: "Koordinacija vjenčanja",
    image: "service-koordinacija.jpg",
    text: "Za parove koji su već organizirali većinu svog vjenčanja, a žele profesionalnu podršku u završnoj fazi i na sam dan. Zajedno prolazimo sve detalje, izrađujemo jasan protokol i raspored, a na dan vjenčanja koordiniram uzvanike i izvođače. Vaše je samo da uživate.",
  },
  {
    id: "maticar",
    title: "Simbolični matičar",
    image: "service-maticar.jpg",
    text: "Simbolična ceremonija daje vam slobodu da vjenčanje oblikujete onako kako želite — u prirodi, vinogradu, parku ili mjestu koje za vas ima značenje. Uz osobne zavjete, glazbu i pažljivo osmišljen govor, često postaje najemotivniji trenutak dana. Ceremoniju vodim i na engleskom jeziku.",
  },
  {
    id: "konzultacije",
    title: "Konzultacije",
    image: "service-konzultacije.jpg",
    text: "Za parove koji žele sami organizirati vjenčanje, uz stručne smjernice. Na sastanku prolazimo lokaciju, izvođače, raspored dana i budžet. Dobivate jasne odgovore i praktične savjete. Vi organizirate, a ja vas usmjeravam kroz proces.",
  },
  {
    id: "moderacija",
    title: "Moderacija događanja",
    image: "service-moderacija.jpg",
    text: "Zahvaljujući godinama rada na radiju kao voditeljica i urednica, moderacija mi je prirodan dio posla. Vodim programe, predstavljam sudionike i brinem da događaj ima dobar ritam, jasnu komunikaciju i ugodnu atmosferu.",
  },
  {
    id: "eventi",
    title: "Organizacija evenata",
    image: "service-eventi.jpg",
    text: "Osim vjenčanja, Studio Happiness organizira privatna i poslovna događanja — od ideje i koncepta do realizacije. Cilj je događaj s jasnom pričom, dobrom atmosferom i profesionalnom organizacijom.",
  },
];

const gallery = [
  "gallery-01.jpg",
  "gallery-02.jpg",
  "gallery-03.jpg",
  "gallery-04.jpg",
  "gallery-05.jpg",
  "gallery-06.jpg",
  "gallery-07.jpg",
  "gallery-08.jpg",
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function onInquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="site" id="pocetak">
      <div className="brand-rail" aria-hidden="true">
        <span>All about events</span>
      </div>

      <header className="nav">
        <Logo compact />
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Izbornik"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <a href="#o-meni" onClick={closeMenu}>
            O meni
          </a>
          <a href="#usluge" onClick={closeMenu}>
            Usluge
          </a>
          <a href="#trenuci" onClick={closeMenu}>
            Trenuci
          </a>
          <a href="#kontakt" onClick={closeMenu}>
            Kontakt
          </a>
        </nav>
      </header>

      <section className="hero">
        <img src={photo("hero.jpg")} alt="Mlada i djeveruše nazdravljaju na otvorenom" />
        <div className="hero-copy">
          <p className="eyebrow">All about events</p>
          <h1>
            Vjenčanja i događanja
            <br />
            koja se pamte.
          </h1>
          <p className="lede">
            Studio Happiness iz Osijeka. Više od 15 godina uz parove i klijente — od prve ideje do
            posljednjeg plesa.
          </p>
          <a className="btn" href="#kontakt">
            Zakažite razgovor
          </a>
        </div>
      </section>

      <section className="about" id="o-meni">
        <div className="about-copy">
          <p className="eyebrow">Osnivačica</p>
          <h2 className="script">Ja sam Tihana</h2>
          <p>
            Ja sam Tihana Tomljanović, osnivačica Studija Happiness iz Osijeka. Već više od 15 godina
            moj posao je stvarati vjenčanja i događanja koja ljudi pamte cijeli život. Iza mene su
            brojni projekti, od intimnih ceremonija do privatnih i poslovnih evenata, ali ono što mi
            je uvijek najvažnije su zadovoljni klijenti i odnos koji s njima gradim kroz cijeli
            proces.
          </p>
          <p>
            Svaki događaj za mene je nova priča. Upravo zato svakom paru ili klijentu pristupam
            individualno, s puno pažnje prema detaljima i atmosferi koju zajedno stvaramo. Povjerenje,
            otvorena komunikacija i dobra energija temelj su svake uspješne suradnje.
          </p>
          <p className="closing-line">Najljepši dio mog posla su ljudi i njihove priče.</p>
        </div>
        <figure className="about-photo">
          <img src={photo("tihana.jpg")} alt="Tihana Tomljanović uz cvjetni aranžman" />
          <span className="pixel-dot" aria-hidden="true" />
        </figure>
      </section>

      <section className="services" id="usluge">
        <div className="section-head">
          <p className="eyebrow">Usluge</p>
          <h2>Kako mogu biti uz&nbsp;vas.</h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service" key={service.id} id={service.id}>
              <div className="service-image">
                <img src={photo(service.image)} alt="" />
              </div>
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery" id="trenuci">
        <div className="section-head">
          <p className="eyebrow">Trenuci</p>
          <h2>Priče koje smo već ispričali</h2>
        </div>
        <div className="mosaic">
          {gallery.map((name, index) => (
            <figure key={name} className={`tile t${index + 1}`}>
              <img src={photo(name)} alt="" />
            </figure>
          ))}
        </div>
      </section>

      <section className="contact" id="kontakt">
        <div className="contact-copy">
          <p className="eyebrow">Kontakt</p>
          <h2>Recite mi svoju priču.</h2>
          <p>
            Javite se za vjenčanje, ceremoniju ili event. Odgovaram osobno — bez obrazaca koji idu u
            prazno.
          </p>
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
        </div>
        {sent ? (
          <div className="thanks">
            <Mark />
            <h3>Hvala vam.</h3>
            <p>Poruka je zabilježena na ovom uređaju. Tihana će vam se javiti čim povežemo pravi inbox.</p>
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
              Telefon
              <input name="phone" type="tel" placeholder="091 …" />
            </label>
            <label>
              Usluga
              <select name="service" defaultValue="organizacija">
                <option value="organizacija">Organizacija vjenčanja</option>
                <option value="koordinacija">Koordinacija vjenčanja</option>
                <option value="maticar">Simbolični matičar</option>
                <option value="konzultacije">Konzultacije</option>
                <option value="moderacija">Moderacija</option>
                <option value="eventi">Organizacija evenata</option>
              </select>
            </label>
            <label>
              Datum događaja
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
      </section>

      <section className="closing">
        <img src={photo("closing.jpg")} alt="Pogled iz zraka na ceremoniju u vrtu" />
        <div className="closing-copy">
          <p className="eyebrow">Happiness by Tihana</p>
          <blockquote>
            Jer svaki poseban događaj počinje dobrom energijom i pravim ljudima.
          </blockquote>
          <p className="sign">Tihana</p>
        </div>
      </section>

      <footer className="footer">
        <Logo compact />
        <p>Studio Happiness · Osijek · All about events</p>
      </footer>
    </div>
  );
}
