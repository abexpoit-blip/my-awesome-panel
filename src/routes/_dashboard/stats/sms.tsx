import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/stats/sms")({
  component: () => <div className="p-8"><h1>SMS Stats</h1><p>Detailed SMS statistics coming soon...</p></div>,
});
