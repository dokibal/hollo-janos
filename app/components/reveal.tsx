"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Content stays visible before hydration and when animation is unavailable.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (
      !element ||
      reducedMotion.matches ||
      !("IntersectionObserver" in window) ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    setVisible(false);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0 }
    );
    observer.observe(element);

    const onMotionChange = () => {
      if (reducedMotion.matches) {
        setVisible(true);
        observer.disconnect();
      }
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-reveal={visible ? "visible" : "pending"}
      onFocusCapture={() => setVisible(true)}
    >
      {children}
    </div>
  );
}
