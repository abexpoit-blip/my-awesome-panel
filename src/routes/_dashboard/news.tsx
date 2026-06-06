import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/news")({
  component: () => <div className="p-8"><h1>News & Updates</h1><p>Latest announcements from IMS.</p></div>,
});
