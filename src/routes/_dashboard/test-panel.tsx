import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/test-panel")({
  component: () => <div className="p-8"><h1>SMS Test Panel</h1><p>Test your numbers and connectivity here.</p></div>,
});
