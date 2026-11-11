import { photo, type Shot } from "./content";

const sizes: Record<string, { width: number; height: number }> = {
  "dogadanja.jpg": { width: 1199, height: 1800 },
  "gallery-01.jpg": { width: 1199, height: 1800 },
  "gallery-02.jpg": { width: 1199, height: 1800 },
  "gallery-03.jpg": { width: 1200, height: 1800 },
  "gallery-04.jpg": { width: 1440, height: 1800 },
  "gallery-05.jpg": { width: 1600, height: 1600 },
  "gallery-06.jpg": { width: 1440, height: 1800 },
  "hero.jpg": { width: 2400, height: 1599 },
  "service-koordinacija.jpg": { width: 1199, height: 1800 },
  "service-maticar.jpg": { width: 1800, height: 1200 },
  "service-moderacija.jpg": { width: 1199, height: 1800 },
  "vjencanja.jpg": { width: 1800, height: 1800 },
};

export function Gallery({ items }: { items: Shot[] }) {
  if (!items.length) return null;

  return (
    <div className="stack">
      {items.map((item, index) => {
        const size = sizes[item.src];
        const caption = item.caption ?? item.alt;
        return (
          <figure
            className="stack-card frame reveal"
            key={`${item.src}-${index}`}
            style={{ zIndex: index + 1, ["--delay" as string]: `${Math.min(index, 4) * 40}ms` }}
          >
            <img
              src={photo(item.src)}
              alt={item.alt}
              width={size?.width}
              height={size?.height}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
            />
            <figcaption>{caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
