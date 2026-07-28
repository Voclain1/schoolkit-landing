import { getHomepageBodyHtml, getHomepageScript } from "@/lib/landing";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getHomepageBodyHtml() }} />
      <script dangerouslySetInnerHTML={{ __html: getHomepageScript() }} />
    </>
  );
}
