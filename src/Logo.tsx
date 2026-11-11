type LogoProps = {
  inverted?: boolean;
  compact?: boolean;
};

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`mark ${className}`} viewBox="0 0 48 64" aria-hidden="true">
      <rect width="48" height="16" fill="currentColor" className="t1" />
      <rect x="16" y="16" width="16" height="16" fill="currentColor" className="t2" />
      <rect x="16" y="32" width="16" height="16" fill="currentColor" className="t3" />
      <rect x="16" y="48" width="16" height="16" fill="currentColor" className="t4" />
    </svg>
  );
}

export function Wordmark({ href = "#pocetak" }: { href?: string }) {
  return (
    <a className="wordmark" href={href}>
      happiness
    </a>
  );
}

export function Logo({ inverted = false, compact = false }: LogoProps) {
  return (
    <a className={`logo${inverted ? " invert" : ""}${compact ? " compact" : ""}`} href="#pocetak">
      <Mark />
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
    </a>
  );
}
