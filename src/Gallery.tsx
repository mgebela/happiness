import { photo, type Shot } from "./content";

export function Gallery({ items }: { items: Shot[] }) {
  if (!items.length) return null;

  return (
    <div className="stack">
      {items.map((item, index) => (
        <figure
          className="stack-card frame reveal"
          key={`${item.src}-${index}`}
          style={{ zIndex: index + 1, ["--delay" as string]: `${Math.min(index, 4) * 40}ms` }}
        >
          <img
            src={photo(item.src)}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            style={item.position ? { objectPosition: item.position } : undefined}
          />
        </figure>
      ))}
    </div>
  );
}
