import { useRef, type MouseEvent } from "react";
import { memberInitials, type GangMember } from "@/data/gang";
import { cn } from "@/lib/utils";

type MemberPortraitProps = {
  member: GangMember;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  interactive?: boolean;
};

const sizes = {
  sm: "h-12 w-12 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
  xl: "h-40 w-40 text-4xl sm:h-48 sm:w-48 sm:text-5xl",
};

export function MemberPortrait({
  member,
  size = "md",
  className,
  interactive = true,
}: MemberPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) scale(1.03)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[linear-gradient(145deg,oklch(0.3_0.12_305),oklch(0.14_0.06_305))] transition-transform duration-200 ease-out will-change-transform",
        sizes[size],
        className,
      )}
      style={{ boxShadow: `0 0 0 1px ${member.accent}33, 0 0 36px ${member.accent}40` }}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 30% 22%, ${member.accent}99, transparent 58%)`,
        }}
      />
      <div className="absolute inset-[10%] rounded-full border border-white/10" />
      <span className="font-display relative z-10 tracking-[0.2em] text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]">
        {memberInitials(member)}
      </span>
      {member.status === "live" ? (
        <span className="ballas-live-dot absolute right-[8%] bottom-[8%] h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[oklch(0.12_0.04_305)]" />
      ) : null}
    </div>
  );
}
