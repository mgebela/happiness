import { FormEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Mark } from "./Logo";
import { moments, photo, services } from "./content";

function Hero({
  src,
  alt,
  position,
  video,
}: {
  src: string;
  alt: string;
  position: string;
  video?: string;
}) {
  return (
    <section className="film hero-page" aria-label={alt}>
      <img className="hero-poster" src={photo(src)} alt={alt} style={{ objectPosition: position }} />
      {video && (
        <video className="hero-media" autoPlay muted loop playsInline preload="auto" poster={photo(src)} aria-hidden="true">
          <source src={photo(video)} type="video/mp4" />
        </video>
      )}
    </section>
  );
}

function Strip({ items }: { items: { src: string; alt: string; position: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="strip">
      {items.map((item) => (
        <figure className="frame reveal" key={item.src}>
          <img src={photo(item.src)} alt={item.alt} style={{ objectPosition: item.position }} />
        </figure>
      ))}
    </div>
  );
}

function EnquireCta() {
  return (
    <p className="cta-wrap reveal">
      <Link className="btn" to="/upit">
        Pošaljite upit
      </Link>
    </p>
  );
}

function BackLink() {
  return (
    <Link className="back-link" to="/#pregled">
      <svg className="back-link-icon" viewBox="0 0 28 12" aria-hidden="true">
        <path d="M6 1 L1 6 L6 11 M1 6 H27" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      Natrag
    </Link>
  );
}

export function AboutPage() {
  return (
    <>
      <section className="prose prose-page reveal">
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
      </section>
      <figure className="portrait reveal">
        <span className="frame">
          <img src={photo("tihana.jpg")} alt="Tihana Tomljanović vodi simboličnu ceremoniju pod cvjetnim lukom" />
        </span>
      </figure>
      <section className="prose reveal">
        <p className="lede">
          Svaki događaj za mene je nova priča. Upravo zato svakom paru ili klijentu pristupam
          individualno, s puno pažnje prema detaljima i atmosferi koju zajedno stvaramo. Povjerenje,
          otvorena komunikacija i dobra energija temelj su svake uspješne suradnje.
        </p>
        <p className="lede">Najljepši dio mog posla su ljudi i njihove priče.</p>
        <EnquireCta />
      </section>
    </>
  );
}

export function MomentsPage() {
  return (
    <>
      <Hero src="gallery-02.jpg" alt="Poljubac pod vatrometom" position="center 78%" />
      <section className="prose reveal">
        <p className="label">Trenuci</p>
        <p className="lede">Priče koje smo već ispričali.</p>
      </section>
      <Strip items={moments} />
      <section className="prose reveal">
        <EnquireCta />
      </section>
    </>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const service = services.find((item) => item.id === slug);

  if (!service) return <Navigate to="/" replace />;

  const isFilm = service.id === "organizacija";

  return (
    <>
      <Hero
        src={isFilm ? "hero-poster.jpg" : service.image}
        alt={service.alt}
        position={isFilm ? "center 42%" : service.position}
        video={isFilm ? "hero.mp4" : undefined}
      />
      <section className="prose reveal">
        <p className="label">{service.title}</p>
        {service.paragraphs.map((text) => (
          <p className="lede" key={text.slice(0, 28)}>
            {text}
          </p>
        ))}
      </section>
      <Strip items={service.extras} />
      <section className="prose service-end reveal">
        <Link className="btn" to="/upit">
          Pošaljite upit
        </Link>
        <BackLink />
      </section>
    </>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function onInquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="enquire enquire-page reveal">
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
          <button className="btn" type="submit">
            Pošaljite upit
          </button>
        </form>
      )}
    </section>
  );
}
