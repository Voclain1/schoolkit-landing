"use client";

import { useEffect } from "react";

/** Attach after every homepage navigation, including client-side returns. */
export default function HomepageInteractions() {
  useEffect(() => {
    const home = document.querySelector(".sk-home");
    if (!home) return;
    const onClick = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("button[data-period]");
      if (!button || !home.contains(button)) return;
      const yearly = button.dataset.period === "year";
      home.querySelectorAll<HTMLButtonElement>("button[data-period]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      home.querySelectorAll(".pc-price").forEach((price) => {
        price.classList.toggle("show-year", yearly);
      });
    };
    home.addEventListener("click", onClick);
    return () => home.removeEventListener("click", onClick);
  }, []);

  return null;
}
