import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/sms/numbers")({
  component: () => <div className="p-8"><h1>SMS Numbers</h1><p>Manage your assigned numbers here.</p></div>,
});
