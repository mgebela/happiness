import { Link } from "react-router-dom";

type LockupProps = {
  compact?: boolean;
  invert?: boolean;
  mark?: boolean;
  className?: string;
};

const TEAL = ["#7AB7AD", "#97C7BF", "#C7E1DD", "#E2EFED"];
const PAPER = ["#eeedea", "#e4e2de", "#d4d0ca", "#c3beb7"];

export function Mark({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  const fills = invert ? PAPER : TEAL;
  return (
    <svg className={`mark ${className}`} viewBox="0 0 48 64" aria-hidden="true">
      <rect width="48" height="16" fill={fills[0]} />
      <rect x="16" y="16" width="16" height="16" fill={fills[1]} />
      <rect x="16" y="32" width="16" height="16" fill={fills[2]} />
      <rect x="16" y="48" width="16" height="16" fill={fills[3]} />
    </svg>
  );
}

export function Lockup({ compact = false, invert = false, mark = true, className = "" }: LockupProps) {
  return (
    <span
      className={`logo${compact ? " compact" : ""}${invert ? " invert" : ""}${mark ? "" : " wordmark"}${className ? ` ${className}` : ""}`}
    >
      {mark && <Mark invert={invert} />}
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

