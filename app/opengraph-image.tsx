import { ImageResponse } from "next/og";
import { getHankenGroteskFont } from "@/lib/og-font";

export const alt = "SchoolKit — Run Your School. Not Your Spreadsheets.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const title = "Run Your School. Not Your Spreadsheets.";
  const fontData = await getHankenGroteskFont(`${title} SchoolKit schoolkit.ng`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0E5C43",
          color: "#F6F4ED",
          fontFamily: "Hanken Grotesk",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#E0A52E" }}>
          SchoolKit
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#E3EFE9" }}>
          School management software for Nigerian private schools
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Hanken Grotesk", data: fontData, weight: 700 as const, style: "normal" as const }]
        : [],
    }
  );
}
