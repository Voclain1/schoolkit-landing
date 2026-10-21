"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className={`nav-links${open ? " open" : ""}`}>
        <Link href="/demo" className="l" onClick={close}>
          Demo
        </Link>
        <Link href="/features" className="l" onClick={close}>
          Features
        </Link>
        <Link href="/#how" className="l" onClick={close}>
          Getting started
        </Link>
        <Link href="/#roles" className="l" onClick={close}>
          Who it&apos;s for
        </Link>
        <Link href="/pricing" className="l" onClick={close}>
          Pricing
        </Link>
        <Link href="/blog" className="l" onClick={close}>
          Blog
        </Link>
      </div>
      <Link href="/#join" className="pill" onClick={close}>
        Get started free
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

