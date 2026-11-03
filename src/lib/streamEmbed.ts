/** Build an in-page embed URL for known stream hosts. */
export function getStreamEmbedUrl(streamUrl: string | undefined, parentHost: string): string | null {
  if (!streamUrl) return null;
  try {
    const url = new URL(streamUrl);
    const host = url.hostname.replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);

    if (host === "twitch.tv" || host.endsWith("twitch.tv")) {
      const channel = parts[0];
      if (!channel || ["directory", "videos", "settings", "p"].includes(channel.toLowerCase())) {
        return null;
      }
      return `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${encodeURIComponent(parentHost)}&muted=true&autoplay=true`;
    }

    if (host === "youtube.com" || host === "youtu.be" || host.endsWith("youtube.com")) {
      let id = host === "youtu.be" ? parts[0] : null;
      if (!id && url.searchParams.get("v")) id = url.searchParams.get("v");
      if (!id && parts[0] === "live" && parts[1]) id = parts[1];
      if (!id && parts[0] === "embed" && parts[1]) id = parts[1];
      if (!id) return null;
      return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&mute=1`;
    }

    if (host === "kick.com") {
      const channel = parts[0];
      if (!channel) return null;
      return `https://player.kick.com/${encodeURIComponent(channel)}`;
    }

    return null;
  } catch {
    return null;
  }
}
