import type { Metadata } from "next";
import DemoViewTracker from "@/components/DemoViewTracker";

const SITE_URL = "https://schoolkit.ng";
const APP_URL = "https://app.schoolkit.ng";

// Hosted on YouTube; embedded through youtube-nocookie.com so no tracking
// cookies are set until the visitor actually plays the video.
const VIDEO_ID = "14Ie5eFYbzY";
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`;

// The five steps of the setup wizard, in the order the recording walks them.
const STEPS = [
  { title: "Basics", body: "Your school's name, address and contact details." },
  { title: "Logo", body: "Upload your school logo, or skip it for now." },
  { title: "Invites", body: "Add admin email addresses, or skip and do it later." },
  { title: "NDPR", body: "Read and accept the data protection terms." },
  { title: "Complete", body: "Set the academic year, its dates and the current term." },
];

const TITLE = "SchoolKit Demo — See How SchoolKit Works";
const DESCRIPTION =
  "A 2-minute walkthrough of setting up a school on SchoolKit: create the school, run the setup wizard, add students and invite staff.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/demo` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/demo`,
    type: "website",
    siteName: "SchoolKit",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function DemoPage() {
  return (
    <div className="demo-page">
      <DemoViewTracker targetId="demo-stage" videoId={VIDEO_ID} videoTitle="SchoolKit product demo" />

      <div className="demo-intro">
        <h1>See how SchoolKit works</h1>
        <p>A 2-minute walkthrough of setting up a school, end to end.</p>
      </div>

      {/* Full-bleed dark band: the video is the page, not a card on it. */}
      <div className="demo-stage" id="demo-stage">
        <div className="demo-stage-in">
          <iframe
            src={EMBED_SRC}
            title="SchoolKit product demo"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="demo-body">
        <h2 className="demo-h2">What the video shows</h2>

        <ol className="demo-steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="demo-step-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="demo-cta">
          <h2>Ready to set your school up?</h2>
          <a href={APP_URL} className="pill" data-location="demo-page">
            Get SchoolKit for Your School
          </a>
        </div>
      </div>
    </div>
  );
}
