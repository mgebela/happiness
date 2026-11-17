import { photo, type Shot } from "./content";

export function Gallery({ items }: { items: Shot[] }) {
  if (!items.length) return null;

  return (
    <div className="stack">
      {items.map((item, index) => {
        const wide = Boolean(item.width && item.height && item.width >= item.height);
        return (
          <figure
            className={`stack-card${wide ? " is-wide" : ""}`}
            key={`${item.src}-${index}`}
            style={{ zIndex: index + 1 }}
          >
            <img
              src={photo(item.src)}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              style={!wide && item.position ? { objectPosition: item.position } : undefined}
            />
          </figure>
        );
      })}
    </div>
  );
}
