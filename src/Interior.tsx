import { FormEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Gallery } from "./Gallery";
import { Mark } from "./Logo";
import { galleries } from "./galleries";
import { photo, services, weddingIds } from "./content";

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
        <h1 className="label">O meni</h1>
        <p className="lede">Ja sam Tihana.</p>
        <p className="lede">
          Osnivačica sam Studija Happiness iz Osijeka. Više od 15 godina bavim se organizacijom
          vjenčanja, privatnih i poslovnih događanja, vođenjem ceremonija i moderiranjem.
        </p>
      </section>
      <figure className="portrait reveal">
        <span className="frame">
          <img src={photo("tihana.jpg")} alt="Tihana, crno-bijeli portret" />
        </span>
      </figure>
      <section className="prose reveal">
        <p className="lede">
          Iza mene su brojni projekti, različiti ljudi i još više priča. U svakom poslu važni su mi
          povjerenje, jasna komunikacija i profesionalan odnos. Klijentima pristupam individualno, uz
          razumijevanje njihovih želja i odgovornost prema svakom dogovoru.
        </p>
        <p className="lede">Vjerujem u dobru pripremu, promišljene detalje i sigurnu izvedbu.</p>
        <p className="lede">Moj posao počinje razumijevanjem ljudi, a završava dobro odrađenim poslom.</p>
        <p className="lede">Kad je važno, važno je tko stoji iza toga.</p>
      </section>
      <section className="prose service-end reveal">
        <Link className="btn" to="/upit">
          Pošaljite upit
        </Link>
        <BackLink />
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
      <Gallery items={galleries.vjencanja} />
      <section className="prose reveal">
        <EnquireCta />
      </section>
    </>
  );
}

export function WeddingsPage() {
  const chapters = weddingIds
    .map((id) => services.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const shots = chapters.flatMap((item) => item.extras).filter((shot, index, all) => all.findIndex((entry) => entry.src === shot.src) === index);

  return (
    <>
      <Hero src="hero-poster.jpg" alt="Mlada se okreće prema kameri, mladoženja stoji u parku" position="center 42%" video="hero.mp4" />
      <section className="prose reveal">
        <h1 className="label">Vjenčanja</h1>
        {chapters.map((chapter) => (
          <div className="service-block" key={chapter.id}>
            <h2 className="label">{chapter.title}</h2>
            {chapter.paragraphs.map((text) => (
              <p className="lede" key={text.slice(0, 28)}>
                {text}
              </p>
            ))}
          </div>
        ))}
      </section>
      <Gallery items={shots} />
      <section className="prose service-end reveal">
        <Link className="btn" to="/upit">
          Pošaljite upit
        </Link>
        <BackLink />
      </section>
    </>
  );
}

export function ServicePage() {
  const { slug } = useParams();

  if (slug && weddingIds.includes(slug as (typeof weddingIds)[number])) {
    return <Navigate to="/vjencanja" replace />;
  }

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
        <h1 className="label">{service.title}</h1>
        {service.paragraphs.map((text) => (
          <p className="lede" key={text.slice(0, 28)}>
            {text}
          </p>
        ))}
      </section>
      <Gallery items={service.extras} />
      <section className="prose service-end reveal">
        <Link className="btn" to="/upit">
          Pošaljite upit
        </Link>
        <BackLink />
      </section>
    </>
  );
}

const contactWays = [
  { id: "email", label: "E-mail", thanks: "Javit ću se osobno na e-mail." },
  { id: "telefon", label: "Telefon", thanks: "Javit ću se osobno telefonom." },
  { id: "whatsapp", label: "WhatsApp", thanks: "Javit ću se osobno na WhatsApp." },
] as const;

type ContactWay = (typeof contactWays)[number]["id"];

export function ContactPage() {
  const [sent, setSent] = useState<(typeof contactWays)[number] | null>(null);
  const [way, setWay] = useState<ContactWay>("email");
  const needsPhone = way !== "email";

  function onInquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(contactWays.find((item) => item.id === way) ?? contactWays[0]);
  }

  return (
    <section className="enquire enquire-page reveal">
      <h1 className="label">Upit</h1>
      <p className="lede">
        Javite se za vjenčanje, ceremoniju, event ili konzultacije. Odgovaram osobno.
      </p>
      {sent ? (
        <div className="thanks" role="status">
          <Mark />
          <h2>Hvala vam.</h2>
          <p>Upit je zaprimljen. {sent.thanks}</p>
        </div>
      ) : (
        <form onSubmit={onInquire}>
          <label>
            Ime i prezime
            <input name="name" required placeholder="Vaše ime" autoComplete="name" />
          </label>
          <label>
            E-mail
            <input name="email" type="email" required placeholder="vas@email.com" autoComplete="email" />
          </label>
          <label>
            Telefon
            <input
              name="phone"
              type="tel"
              required={needsPhone}
              placeholder="091 …"
              autoComplete="tel"
            />
          </label>
          <label>
            Način kontakta
            <select
              name="contact"
              value={way}
              onChange={(event) => setWay(event.target.value as ContactWay)}
            >
              {contactWays.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
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
      <BackLink />
    </section>
  );
}
