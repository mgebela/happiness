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
      "Ako želite potpuno bezbrižan proces planiranja, tu smo od prve ideje. Pomažem u odabiru lokacije, izvođača i svih važnih detalja, izrađujemo koncept i plan vjenčanja te koordiniram sve uključene. Vi donosite odluke, a ja brinem da se sve realizira bez stresa.",
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
      "Koordinacija je za parove koji su već organizirali većinu vjenčanja, a žele profesionalnu podršku u završnoj fazi i na sam dan. Zajedno prolazimo detalje, izrađujemo jasan protokol i raspored, a na dan vjenčanja koordiniram uzvanike i izvođače. Vaše je samo da uživate.",
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
      "Simbolična ceremonija daje vam slobodu da vjenčanje oblikujete onako kako želite — u prirodi, vinogradu, parku ili mjestu koje za vas ima značenje. Svaka je personalizirana i prilagođena vašoj priči.",
      "Uz osobne zavjete, glazbu i pažljivo osmišljen govor, često postaje najemotivniji trenutak dana. Ceremoniju vodim i na engleskom jeziku.",
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
      "Konzultacije su za parove koji žele sami organizirati vjenčanje, uz stručne smjernice. Na sastanku prolazimo lokaciju, izvođače, raspored dana i budžet. Dobijete jasne odgovore i praktične savjete. Vi organizirate, a ja vas usmjeravam kroz proces.",
    ],
    extras: [],
  },
  {
    id: "moderacija",
    nav: "Moderacija",
    title: "Moderacija događanja",
    image: "service-moderacija.jpg",
    position: "center 42%",
    alt: "Tihana vodi panel diskusiju na konferenciji",
    paragraphs: [
      "Zahvaljujući godinama rada na radiju, moderacija mi je prirodan dio posla. Vodim programe, predstavljam sudionike i brinem da događaj ima dobar ritam, jasnu komunikaciju i ugodnu atmosferu. Dobra moderacija povezuje cijeli događaj u jednu cjelinu.",
    ],
    extras: galleries.moderacija,
  },
  {
    id: "eventi",
    nav: "Eventi",
    title: "Organizacija evenata",
    image: "dogadanja.jpg",
    position: "center 58%",
    alt: "Lounge kutak na otvorenom, drvene klupe i bijeli jastuci",
    paragraphs: [
      "Osim vjenčanja, Happiness by Tihana organizira privatna i poslovna događanja — od ideje i koncepta do realizacije. Cilj je događaj s jasnom pričom, dobrom atmosferom i profesionalnom organizacijom, bilo da se radi o proslavi, korporativnom eventu ili posebnoj prilici.",
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
