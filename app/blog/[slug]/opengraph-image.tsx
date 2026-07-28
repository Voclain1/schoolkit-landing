import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { getHankenGroteskFont } from "@/lib/og-font";

export const alt = "SchoolKit blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "SchoolKit Blog";

  const fontData = await getHankenGroteskFont(`${title} SchoolKit schoolkit.ng/blog`);

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
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#E3EFE9" }}>
          schoolkit.ng/blog
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
