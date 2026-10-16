"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function ContactAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest('a[href^="tel:"]')
      ) {
        sendGAEvent("event", "phone_click", { method: "phone_link" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
