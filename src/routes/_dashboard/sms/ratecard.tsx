import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/sms/ratecard")({
  component: () => <div className="p-8"><h1>Rate Card</h1><p>View current pricing for all ranges.</p></div>,
});
