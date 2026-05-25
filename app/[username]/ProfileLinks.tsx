"use client";
import { createClient } from "@/lib/supabase/client";
import { detectLinkType, getLinkIcon, getLinkColor } from "@/lib/linkIcons";
import type { Theme } from "@/lib/types/theme";
type Link = { id: string; title: string; url: string };

function getDeviceType(): string {
  return /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
}

async function recordClick(linkId: string) {
  const supabase = createClient();
  await supabase.from("clicks").insert({
    link_id: linkId,
    device_type: getDeviceType(),
    referrer: document.referrer || null,
  });
}

export default function ProfileLinks({
  links,
  theme,
}: {
  links: Link[];
  theme: Theme;
}) {
  if (links.length === 0) {
    return (
      <p
        className="text-center text-sm"
        style={{ color: theme.buttonBg, opacity: 0.6 }}
      >
        No links yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => {
        const linkType = detectLinkType(link.url);
        const IconComponent = getLinkIcon(linkType);
        const iconColor = getLinkColor(linkType);

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 px-5 py-4 text-sm font-medium transition-opacity hover:opacity-80 ${theme.buttonRadius} ${theme.fontFamily}`}
            style={{ background: theme.buttonBg, color: theme.buttonText }}
          >
            <IconComponent
              className="h-5 w-5"
              style={{ color: theme.buttonText }}
            />
            <span>{link.title}</span>
          </a>
        );
      })}
    </div>
  );
}
