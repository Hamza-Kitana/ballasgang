import type { StreamPlatform } from "@/lib/streamEmbed";
import { cn } from "@/lib/utils";

type StreamPlatformBadgeProps = {
  platform: StreamPlatform;
  label: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

function PlatformIcon({ platform }: { platform: StreamPlatform }) {
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-[0.85em] w-[0.85em]" aria-hidden fill="currentColor">
        <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.4.5A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8ZM9.8 15.5v-7l6.3 3.5-6.3 3.5Z" />
      </svg>
    );
  }

  if (platform === "kick") {
    return (
      <svg viewBox="0 0 24 24" className="h-[0.85em] w-[0.85em]" aria-hidden fill="currentColor">
        <path d="M4 3h5.2v6.3L14.8 3H21l-6.8 7.2L21 21h-6.2l-5.6-7.5V21H4V3Z" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className="h-[0.9em] w-[0.9em]" aria-hidden fill="currentColor">
        <path d="M16.6 2h-3.4v12.2a2.7 2.7 0 1 1-1.9-2.6V8.1a6.1 6.1 0 1 0 5.3 6V8.4c1.2.9 2.7 1.4 4.2 1.4V6.4c-1.6 0-3-.7-4.2-1.8V2Z" />
      </svg>
    );
  }

  if (platform === "twitch") {
    return (
      <svg viewBox="0 0 24 24" className="h-[0.85em] w-[0.85em]" aria-hidden fill="currentColor">
        <path d="M3.2 2 2 5.2v14.6h5V22l2.8-2.2h4.4L20.8 14V2H3.2Zm15.4 10.8-2.8 2.8h-4.4l-2.4 1.9v-1.9H5.2V4.2h13.4v8.6ZM14.8 7h1.8v5.2H14.8V7Zm-4.6 0H12v5.2H10.2V7Z" />
      </svg>
    );
  }

  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />;
}

export function StreamPlatformBadge({
  platform,
  label,
  className,
  size = "sm",
}: StreamPlatformBadgeProps) {
  return (
    <span
      className={cn(
        "ballas-platform-badge inline-flex items-center gap-1.5 rounded-full border font-bold tracking-[0.14em] uppercase",
        size === "sm" && "px-2 py-0.5 text-[9px]",
        size === "md" && "px-2.5 py-1 text-[10px]",
        size === "lg" &&
          "gap-2 px-3.5 py-2 text-[12px] tracking-[0.16em] shadow-[0_8px_22px_rgba(0,0,0,0.4)]",
        platform === "youtube" && "ballas-platform-youtube",
        platform === "kick" && "ballas-platform-kick",
        platform === "tiktok" && "ballas-platform-tiktok",
        platform === "twitch" && "ballas-platform-twitch",
        platform === "unknown" && "ballas-platform-unknown",
        className,
      )}
    >
      <PlatformIcon platform={platform} />
      {label}
    </span>
  );
}
