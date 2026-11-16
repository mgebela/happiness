import { galleries } from "./galleries";

export const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`;

export type Shot = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  position?: string;
};

export type Service = {
  id: string;
  nav: string;
  title: string;
  image: string;
  position: string;
  alt: string;
  paragraphs: string[];
  extras: Shot[];
};

export const services: Service[] = [
  {
    id: "organizacija",
    nav: "Organizacija",
    title: "Organizacija vjenčanja",
    image: "vjencanja.jpg",
    position: "center 48%",
    alt: "Mlada se okreće prema kameri, mladoženja stoji u parku",
    paragraphs: [
      "Od prve ideje do posljednjeg detalja, vodim cijeli proces organizacije vašeg vjenčanja.",
      "Zajedno definiramo koncept, biramo lokaciju i izvođače, planiramo budžet i oblikujemo svaki segment događaja. Povezujem sve uključene i preuzimam brigu o organizaciji kako biste u svakom trenutku znali što je sljedeće i imali sigurnost da je sve pod kontrolom.",
      "Vi donosite odluke. Ja brinem o njihovoj realizaciji.",
    ],
    extras: galleries.vjencanja,
  },
  {
    id: "koordinacija",
    nav: "Koordinacija",
    title: "Koordinacija vjenčanja",
    image: "service-koordinacija.jpg",
    position: "center 28%",
    alt: "Priprema lounge kutka na dan događaja",
    paragraphs: [
      "Već ste organizirali svoje vjenčanje, ali želite da netko iskusan preuzme brigu o završnim pripremama i samom danu?",
      "Prolazimo sve dogovorene detalje, izrađujemo protokol i raspored te usklađujemo rad svih uključenih. Na dan vjenčanja preuzimam koordinaciju izvođača, uzvanika i cjelokupnog programa.",
      "Vi ste domaćini i gosti vlastitog vjenčanja. Ja brinem da sve funkcionira kako treba.",
    ],
    extras: [],
  },
  {
    id: "maticar",
    nav: "Simbolični matičar",
    title: "Simbolični matičar",
    image: "service-maticar.jpg",
    position: "center 46%",
    alt: "Ceremonija uz jezero, mladenka i mladoženja pod bijelim suncobranima",
    paragraphs: [
      "Ceremonija koja prati vas, vašu priču i način na koji želite obilježiti svoje vjenčanje.",
      "Simboličnu ceremoniju oblikujem individualno, prema vašim željama i osobnosti. Lokacija, tekst, glazba, osobni zavjeti i svi ostali elementi dogovaraju se zajedno.",
      "Ceremonije se mogu održati na otvorenom, u prirodi, vinogradima, parkovima ili na lokacijama koje za vas imaju posebno značenje.",
      "Ceremoniju vodim i na engleskom jeziku.",
    ],
    extras: galleries.maticar,
  },
  {
    id: "konzultacije",
    nav: "Konzultacije",
    title: "Konzultacije",
    image: "gallery-04.jpg",
    position: "center 42%",
    alt: "Cvjetni detalj ceremonije — pampas, dalije i hortenzije",
    paragraphs: [
      "Želite sami organizirati svoje vjenčanje, ali trebate stručnu podršku i provjerene smjernice?",
      "Kroz individualne konzultacije prolazimo sve važne korake organizacije – od odabira lokacije i izvođača do budžeta, rasporeda i logistike.",
      "Dobivate konkretne savjete, odgovore na pitanja i jasniju sliku o svemu što vas očekuje.",
      "Vi vodite organizaciju. Ja vam pomažem donositi sigurnije odluke.",
    ],
    extras: [],
  },
  {
    id: "moderacija",
    nav: "Moderacija",
    title: "Moderacija",
    image: "service-moderacija.jpg",
    position: "center 42%",
    alt: "Tihana vodi panel diskusiju na konferenciji",
    paragraphs: [
      "Dobra moderacija daje događaju ritam, jasnoću i povezanost.",
      "Dugogodišnje iskustvo rada na radiju kao voditeljica i urednica oblikovalo je moj pristup javnom nastupu i vođenju programa.",
      "Moderiram privatna i poslovna događanja, vodim protokol, predstavljam sudionike i povezujem programske cjeline. Prilagođavam se karakteru događaja, publici i njegovoj svrsi.",
      "Profesionalno, jasno i s osjećajem za trenutak.",
    ],
    extras: galleries.moderacija,
  },
  {
    id: "eventi",
    nav: "Eventi",
    title: "Eventi",
    image: "dogadanja.jpg",
    position: "center 58%",
    alt: "Lounge kutak na otvorenom, drvene klupe i bijeli jastuci",
    paragraphs: [
      "Od ideje do realizacije, organiziram privatna i poslovna događanja s jasnim konceptom i preciznom izvedbom.",
      "Svaki projekt započinje razumijevanjem cilja i potreba klijenta. Planiram sadržaj, produkciju, logistiku i sve organizacijske detalje, povezujući ljude i suradnike u funkcionalnu cjelinu.",
      "Bez obzira na format i veličinu događanja, cilj je uvijek isti: kvalitetna organizacija i profesionalna izvedba.",
    ],
    extras: galleries.eventi,
  },
];

export const weddingIds = ["organizacija", "koordinacija", "konzultacije"] as const;

export const menuLinks = [
  { to: "/o-meni", label: "O meni" },
  { to: "/vjencanja", label: "Vjenčanja" },
  { to: "/maticar", label: "Simbolični matičar" },
  { to: "/eventi", label: "Eventi" },
  { to: "/moderacija", label: "Moderacija" },
  { to: "/upit", label: "Upit" },
];
