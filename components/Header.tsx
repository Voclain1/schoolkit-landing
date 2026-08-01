import Link from "next/link";
import { getLogoDataUri } from "@/lib/landing";
import NavMenu from "@/components/NavMenu";

export default function Header() {
  const logo = getLogoDataUri();

  return (
    <div className="bar" id="bar">
      <div className="wrap bar-in">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- data-URI logo, preserved from the original static markup */}
          <img className="lk" src={logo} alt="SchoolKit" />
        </Link>
        <NavMenu />
      </div>
    </div>
  );
}
