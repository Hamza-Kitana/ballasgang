import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/ballas/Experience";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ballas Purple Dynasty" },
      {
        name: "description",
        content: "Enter the Ballas Purple Dynasty — FiveM gang of Los Santos.",
      },
    ],
  }),
});

function Index() {
  return <Experience />;
}
