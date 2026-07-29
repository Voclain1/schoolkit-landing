import Link from "next/link";
import { getLogoDataUri } from "@/lib/landing";

export default function Footer() {
  const logo = getLogoDataUri();

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          {/* eslint-disable-next-line @next/next/no-img-element -- data-URI logo, preserved from the original static markup */}
          <img className="fl" src={logo} alt="SchoolKit" />
          <nav className="fnav">
            <Link href="/#platform">Platform</Link>
            <Link href="/#ai">AI Tutor</Link>
            <Link href="/#roles">Who it&apos;s for</Link>
            <Link href="/blog">Blog</Link>
            <a href="mailto:hello@schoolkit.ng">Contact</a>
          </nav>
        </div>
        <div className="foot-meta">
          <span>
            © <span id="yr">{new Date().getFullYear()}</span> SchoolKit · schoolkit.ng · Built in Lagos, Nigeria
          </span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
