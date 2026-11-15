/** Extract a YouTube video id from a raw id or any common YouTube URL. */
export function extractYoutubeId(input: string | undefined | null): string | null {
  if (!input) return null;
  const raw = input.trim();
  if (!raw) return null;

  // Already a bare id (11 chars typical, allow a bit of range)
  if (/^[\w-]{6,20}$/.test(raw) && !raw.includes(".") && !raw.includes("/")) {
    return raw;
  }

  try {
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const url = new URL(withProto);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;

      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" && parts[1]) return parts[1]!;
      if (parts[0] === "shorts" && parts[1]) return parts[1]!;
      if (parts[0] === "live" && parts[1]) return parts[1]!;
      if (parts[0] === "v" && parts[1]) return parts[1]!;
    }
  } catch {
    /* fall through */
  }

  // Last resort: find v= or youtu.be/ in the string
  const fromQuery = raw.match(/[?&]v=([\w-]{6,20})/);
  if (fromQuery?.[1]) return fromQuery[1];
  const fromShort = raw.match(/youtu\.be\/([\w-]{6,20})/);
  if (fromShort?.[1]) return fromShort[1];
  const fromEmbed = raw.match(/\/(?:embed|shorts|live)\/([\w-]{6,20})/);
  if (fromEmbed?.[1]) return fromEmbed[1];

  return null;
}

export function youtubeWatchUrl(idOrUrl: string): string | null {
  const id = extractYoutubeId(idOrUrl);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}
