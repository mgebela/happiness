export const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`;

export type Service = {
  id: string;
  nav: string;
  title: string;
  image: string;
  position: string;
  alt: string;
  paragraphs: string[];
  extras: { src: string; alt: string; position: string }[];
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
    extras: [
      { src: "hero.jpg", alt: "Par hoda bos po vinogradu u zalasku sunca", position: "center 40%" },
      { src: "gallery-03.jpg", alt: "Par uz kabriolet u vinogradu", position: "center 55%" },
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
    extras: [
      { src: "gallery-06.jpg", alt: "Par pred svećenikom na otvorenoj ceremoniji", position: "center 40%" },
      { src: "gallery-05.jpg", alt: "Mlada i djeveruše nazdravljaju", position: "center 40%" },
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
    extras: [
      { src: "gallery-06.jpg", alt: "Par pred ceremonijom, gledaju prema matičaru", position: "center 40%" },
      { src: "gallery-04.jpg", alt: "Cvjetni detalj ceremonije", position: "center 42%" },
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
    extras: [
      { src: "hero.jpg", alt: "Par u vinogradu", position: "center 40%" },
      { src: "vjencanja.jpg", alt: "Mlada se okreće prema kameri", position: "center 48%" },
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
    extras: [
      { src: "gallery-01.jpg", alt: "Ples na proslavi", position: "center 32%" },
      { src: "gallery-02.jpg", alt: "Poljubac pod vatrometom", position: "center 78%" },
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
    extras: [
      { src: "gallery-01.jpg", alt: "Ples na proslavi", position: "center 32%" },
      { src: "service-koordinacija.jpg", alt: "Priprema lounge kutka", position: "center 28%" },
    ],
  },
];

export const moments = [
  { src: "gallery-02.jpg", alt: "Poljubac pod vatrometom", position: "center 78%" },
  { src: "gallery-03.jpg", alt: "Par uz kabriolet u vinogradu", position: "center 55%" },
  { src: "gallery-01.jpg", alt: "Ples na proslavi, narančasta satenska haljina", position: "center 32%" },
  { src: "gallery-05.jpg", alt: "Mlada i djeveruše nazdravljaju", position: "center 40%" },
  { src: "gallery-06.jpg", alt: "Par na ceremoniji na otvorenom", position: "center 40%" },
  { src: "hero.jpg", alt: "Par hoda vinogradom u zalasku", position: "center 40%" },
];

export const menuLinks = [
  { to: "/o-meni", label: "O meni" },
  ...services.map((service) => ({ to: `/${service.id}`, label: service.nav })),
  { to: "/trenuci", label: "Trenuci" },
  { to: "/upit", label: "Upit" },
];
