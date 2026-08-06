"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className={`nav-links${open ? " open" : ""}`}>
        <Link href="/#platform" className="l" onClick={close}>
          Platform
        </Link>
        <Link href="/#ai" className="l" onClick={close}>
          AI Tutor
        </Link>
        <Link href="/#roles" className="l" onClick={close}>
          Who it&apos;s for
        </Link>
        <Link href="/blog" className="l" onClick={close}>
          Blog
        </Link>
      </div>
      <Link href="/#join" className="pill" onClick={close}>
        Get early access
      </Link>
      <button
        type="button"
        className="menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
