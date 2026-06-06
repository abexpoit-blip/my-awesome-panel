import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/stats/range")({
  component: () => <div className="p-8"><h1>Range Stats</h1><p>Statistics by number range...</p></div>,
});
