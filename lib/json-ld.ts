/**
 * Serializes structured data for an inline <script type="application/ld+json"> tag.
 *
 * JSON.stringify does not escape "</", so any string that reaches it containing a
 * literal "</script" would close the tag early and break page parsing. Escaping
 * "</" to "<\/" prevents that; the escaped form is still valid JSON, so consumers
 * are unaffected.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/<\//g, "<\\/");
}
