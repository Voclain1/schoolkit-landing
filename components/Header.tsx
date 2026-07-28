import Link from "next/link";
import { getLogoDataUri } from "@/lib/landing";

export default function Header() {
  const logo = getLogoDataUri();

  return (
    <div className="bar" id="bar">
      <div className="wrap bar-in">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- data-URI logo, preserved from the original static markup */}
          <img className="lk" src={logo} alt="SchoolKit" />
        </Link>
        <nav className="nav">
          <Link href="/#platform" className="l">
            Platform
          </Link>
          <Link href="/#ai" className="l">
            AI Tutor
          </Link>
          <Link href="/#roles" className="l">
            Who it&apos;s for
          </Link>
          <Link href="/blog" className="l">
            Blog
          </Link>
          <Link href="/#join" className="pill">
            Only 827 spots left
          </Link>
        </nav>
      </div>
    </div>
  );
}
