import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Ballas CMS · لوحة الإدارة" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Ballas Purple Dynasty site admin" },
    ],
  }),
});

function AdminPage() {
  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-background text-foreground" data-admin-shell>
      <AdminApp />
    </div>
  );
}