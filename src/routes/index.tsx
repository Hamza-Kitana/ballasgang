import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/ballas/Experience";
import { SITE, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: absoluteUrl(SITE.image) },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
});

function Index() {
  return <Experience />;
}
