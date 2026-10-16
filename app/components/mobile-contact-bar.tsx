"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { phoneNumberLink } from "../constants";
import { Button } from "./button";

export default function MobileContactBar() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const bar = ref.current;
    const heroAction = document.querySelector("[data-hero-cta]");
    const form = document.querySelector(".contact-form");
    if (!bar || !heroAction || !form) return;

    const mobile = window.matchMedia("(max-width: 47.999rem)");
    const updateVisibility = () => {
      const formRect = form.getBoundingClientRect();
      const formVisible = formRect.top < window.innerHeight && formRect.bottom > 64;
      setVisible(
        mobile.matches &&
          heroAction.getBoundingClientRect().bottom <= 64 &&
          !formVisible
      );
    };
    const reserveSpace = () => {
      const height = bar.getBoundingClientRect().height;
      if (height > 0) {
        document.body.style.setProperty("--mobile-contact-height", `${height}px`);
      }
      updateVisibility();
    };

    document.body.classList.add("has-mobile-contact-bar");
    const observer = new IntersectionObserver(updateVisibility, {
      rootMargin: "-64px 0px 0px 0px",
      threshold: 0,
    });
    observer.observe(heroAction);
    observer.observe(form);
    const resizeObserver = new ResizeObserver(reserveSpace);
    resizeObserver.observe(bar);
    mobile.addEventListener("change", reserveSpace);
    window.addEventListener("resize", reserveSpace);
    reserveSpace();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      mobile.removeEventListener("change", reserveSpace);
      window.removeEventListener("resize", reserveSpace);
      document.body.classList.remove("has-mobile-contact-bar");
      document.body.style.removeProperty("--mobile-contact-height");
    };
  }, []);

  return (
    <nav
      ref={ref}
      className="mobile-contact-bar"
      aria-label="Kapcsolatfelvétel"
      aria-hidden={!visible}
      inert={!visible}
      data-visible={visible}
    >
      <Button asChild width="100%" fontSize="sm" px="12px">
        <a href={phoneNumberLink}>Hívjon most</a>
      </Button>
      <Button
        asChild
        width="100%"
        fontSize="sm"
        px="12px"
        background="transparent"
        color="textWhite"
        borderColor="#D1D5DB"
        _hover={{
          background: "#24282C",
          color: "textWhite",
          borderColor: "textWhite",
        }}
      >
        <Link href="#quotation">Kérjen árajánlatot</Link>
      </Button>
    </nav>
  );
}
