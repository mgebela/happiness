import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function useReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    document.documentElement.classList.add("has-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal:not(.is-visible)").forEach((node) => io.observe(node));

    return () => io.disconnect();
  }, [pathname]);
}
