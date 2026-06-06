import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/credits")({
  component: () => <div className="p-8"><h1>Credit Notes</h1><p>Financial statements and credits.</p></div>,
});
