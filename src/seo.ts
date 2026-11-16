import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const siteOrigin = "https://happiness-by-tihana.netlify.app";

type PageMeta = {
  title: string;
  description: string;
};

const home: PageMeta = {
  title: "Happiness by Tihana — All about events",
  description:
    "Happiness by Tihana — vjenčanja i događanja iz Osijeka. Organizacija i koordinacija vjenčanja, simbolični matičar, konzultacije, eventi i moderacija.",
};

const pages: Record<string, PageMeta> = {
  "/": home,
  "/o-meni": {
    title: "O meni | Happiness by Tihana",
    description:
      "Ja sam Tihana, osnivačica Studija Happiness iz Osijeka. Više od 15 godina organiziram vjenčanja, događanja, ceremonije i moderaciju.",
  },
  "/vjencanja": {
    title: "Vjenčanja | Happiness by Tihana",
    description:
      "Organizacija, koordinacija i konzultacije vjenčanja. Vi donosite odluke, ja brinem o realizaciji — od prve ideje do dana slavlja.",
  },
  "/maticar": {
    title: "Simbolični matičar | Happiness by Tihana",
    description:
      "Personalizirane simbolične ceremonije prema vašoj priči. Na otvorenom, u prirodi ili na mjestu koje volite. Vodim i na engleskom.",
  },
  "/eventi": {
    title: "Eventi | Happiness by Tihana",
    description:
      "Privatna i poslovna događanja od ideje do izvedbe. Jasan koncept, precizna organizacija i profesionalna produkcija.",
  },
  "/moderacija": {
    title: "Moderacija | Happiness by Tihana",
    description:
      "Moderacija privatnih i poslovnih događanja. Ritam, jasnoća i povezanost programa, uz iskustvo rada na radiju.",
  },
  "/upit": {
    title: "Upit | Happiness by Tihana",
    description:
      "Pošaljite upit za vjenčanje, ceremoniju, event ili konzultacije. Odgovaram osobno e-mailom, telefonom ili WhatsAppom.",
  },
};

function upsertMeta(name: string, content: string) {
  let node = document.querySelector(`meta[name="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("name", name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let node = document.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

export function canonicalFor(pathname: string) {
  if (pathname === "/") return `${siteOrigin}/`;
  return `${siteOrigin}${pathname.replace(/\/+$/, "")}`;
}

export function Seo() {
  const { pathname } = useLocation();
  const page = pages[pathname] ?? home;
  const canonical = pages[pathname] ? canonicalFor(pathname) : `${siteOrigin}/`;

  useEffect(() => {
    document.title = page.title;
    upsertMeta("description", page.description);
    upsertMeta("robots", "index, follow");
    upsertLink("canonical", canonical);
  }, [canonical, page.description, page.title]);

  return null;
}
