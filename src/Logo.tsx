import { Link } from "react-router-dom";

type LockupProps = {
  compact?: boolean;
  invert?: boolean;
  mark?: boolean;
  className?: string;
};

const TEAL = ["#7AB7AC", "#9CCBC3", "#BDDDD6", "#DDEEEA"];

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`mark ${className}`} viewBox="0 0 48 64" aria-hidden="true">
      <rect width="48" height="16" fill={TEAL[0]} />
      <rect x="16" y="16" width="16" height="16" fill={TEAL[1]} />
      <rect x="16" y="32" width="16" height="16" fill={TEAL[2]} />
      <rect x="16" y="48" width="16" height="16" fill={TEAL[3]} />
    </svg>
  );
}

export function Lockup({ compact = false, invert = false, mark = true, className = "" }: LockupProps) {
  return (
    <span
      className={`logo${compact ? " compact" : ""}${invert ? " invert" : ""}${mark ? "" : " wordmark"}${className ? ` ${className}` : ""}`}
    >
      {mark && <Mark />}
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

