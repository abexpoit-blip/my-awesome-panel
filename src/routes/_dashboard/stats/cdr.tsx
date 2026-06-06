import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/_dashboard/stats/cdr")({
  component: StatsCDRPage,
});

function StatsCDRPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2b3a4a]">SMS CDR</h1>
      </div>
      <Card className="shadow-lg border-[#e3e6ec] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e3e6ec] bg-[#f8f9fc]">
            <h3 className="font-black text-[#69707a] uppercase text-[11px] tracking-widest">Call Detail Records</h3>
        </div>
        <CardContent className="p-6">
          <p className="text-sm text-[#69707a]">Displaying detailed logs of all SMS transactions.</p>
          <div className="mt-6 border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-[#f8f9fc]">
                <TableRow>
                  <TableHead className="font-bold text-[11px] uppercase">Number</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase">Prefix</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase">Message</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase">Status</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-400 italic">No CDR logs found</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
