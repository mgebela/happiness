import { Link } from "react-router-dom";

type LockupProps = {
  compact?: boolean;
  invert?: boolean;
  mark?: boolean;
  priority?: boolean;
  className?: string;
};

export function Mark({
  className = "",
  invert = false,
  priority = false,
}: {
  className?: string;
  invert?: boolean;
  priority?: boolean;
}) {
  return (
    <img
      className={`mark${className ? ` ${className}` : ""}`}
      src={invert ? "/mark-invert.svg" : "/mark.svg"}
      width={48}
      height={64}
      alt=""
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

export function Lockup({
  compact = false,
  invert = false,
  mark = true,
  priority = false,
  className = "",
}: LockupProps) {
  return (
    <span
      className={`logo${compact ? " compact" : ""}${invert ? " invert" : ""}${mark ? "" : " wordmark"}${className ? ` ${className}` : ""}`}
    >
      {mark && <Mark invert={invert} priority={priority} />}
      <span className="logo-type">
        <span className="logo-happiness">happiness</span>
        <span className="logo-by">
          by <em>tihana</em>
        </span>
        {!compact && (
          <span className="logo-tag">
            all about <em>events</em>
          </span>
        )}
      </span>
    </span>
  );
}

export function Logo({
  to = "/",
  compact = false,
  invert = false,
  mark = true,
  className = "",
}: LockupProps & { to?: string }) {
  return (
    <Link className="logo-link" to={to} onClick={() => window.scrollTo(0, 0)}>
      <Lockup compact={compact} invert={invert} mark={mark} className={className} />
    </Link>
  );
}

