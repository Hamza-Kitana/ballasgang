import { useState } from "react";
import { memberInitials, type GangMember } from "@/data/gang";
import { cn } from "@/lib/utils";

type MemberPortraitProps = {
  member: GangMember;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  rounded?: "full" | "md";
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
  rounded = "full",
}: MemberPortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden border border-white/20 bg-[linear-gradient(145deg,oklch(0.3_0.12_305),oklch(0.14_0.06_305))]",
        rounded === "full" ? "rounded-full" : "rounded-md",
        sizes[size],
        className,
      )}
      style={{ boxShadow: `0 0 0 1px ${member.accent}33, 0 0 24px ${member.accent}33` }}
    >
      {!failed ? (
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at 30% 22%, ${member.accent}99, transparent 58%)`,
            }}
          />
          <span className="font-display relative z-10 tracking-[0.2em] text-white">
            {memberInitials(member)}
          </span>
        </>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {member.status === "live" ? (
        <span className="absolute end-[8%] bottom-[8%] z-10 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[oklch(0.12_0.04_305)]" />
      ) : null}
    </div>
  );
}
