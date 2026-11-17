import { photo, type Shot } from "./content";

export function Gallery({ items }: { items: Shot[] }) {
  if (!items.length) return null;

  return (
    <div className="stack">
      {items.map((item, index) => (
        <figure
          className="stack-card frame"
          key={`${item.src}-${index}`}
          style={
            item.width && item.height
              ? { ["--ratio" as string]: `${item.width} / ${item.height}` }
              : undefined
          }
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
