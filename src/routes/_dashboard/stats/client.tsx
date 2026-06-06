import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/stats/client")({
  component: () => <div className="p-8"><h1>Client Stats</h1><p>Client-wise performance statistics...</p></div>,
});
