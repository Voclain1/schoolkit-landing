import { getLandingBodyHtml, getLandingScript } from "@/lib/landing";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getLandingBodyHtml() }} />
      <script dangerouslySetInnerHTML={{ __html: getLandingScript() }} />
    </>
  );
}
