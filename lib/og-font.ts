export async function getHankenGroteskFont(
  text: string,
  weight: 400 | 700 = 700
): Promise<ArrayBuffer | null> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;

  // A server-side fetch with no browser User-Agent gets served a plain
  // truetype file (browsers get woff2), which is what satori/ImageResponse needs.
  const css = await (await fetch(cssUrl)).text();
  const fontUrlMatch = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  if (!fontUrlMatch) return null;

  const fontResponse = await fetch(fontUrlMatch[1]);
  return fontResponse.arrayBuffer();
}
