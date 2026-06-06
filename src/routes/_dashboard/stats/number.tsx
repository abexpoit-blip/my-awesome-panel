import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/stats/number")({
  component: () => <div className="p-8"><h1>Number Stats</h1><p>Individual number statistics...</p></div>,
});
