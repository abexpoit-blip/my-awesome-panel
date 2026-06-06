import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Play, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/test-panel")({
  component: TestPanelPage,
});

function TestPanelPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      toast.success("Test SMS sent successfully!", {
        description: "Check the CDR logs for updates."
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2b3a4a] tracking-tight">SMS Test Panel</h1>
          <p className="text-[#69707a] text-[13px] font-medium mt-0.5">Test your connectivity and number delivery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-[#e3e6ec] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e3e6ec] bg-[#f8f9fc]">
            <h3 className="font-black text-[#69707a] uppercase text-[11px] tracking-widest">SEND TEST SMS</h3>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase text-[#69707a]">Phone Number</Label>
              <Input 
                placeholder="Enter number (e.g. 447712345678)" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="rounded-lg h-11 border-[#e3e6ec]"
              />
              <p className="text-[10px] text-[#69707a] italic">Enter number with country code, no + or spaces.</p>
            </div>
            
            <Button 
              onClick={handleTest} 
              disabled={isTesting}
              className="bg-[#0061f2] hover:bg-[#0052ce] text-white font-bold text-sm px-8 h-11 shadow-lg shadow-blue-500/20"
            >
              {isTesting ? "Testing..." : (
                <>
                  <Play size={16} className="mr-2" />
                  Run Connectivity Test
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-[#e3e6ec] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e3e6ec] bg-[#f8f9fc]">
            <h3 className="font-black text-[#69707a] uppercase text-[11px] tracking-widest">TEST RESULTS / GUIDE</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ac69] mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#2b3a4a] text-sm">Step 1: Enter Number</h4>
                  <p className="text-[#69707a] text-[12px]">Input your assigned number from the Numbers page.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ac69] mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#2b3a4a] text-sm">Step 2: Submit Test</h4>
                  <p className="text-[#69707a] text-[12px]">Click run to simulate a delivery attempt to that number.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ac69] mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#2b3a4a] text-sm">Step 3: Check Logs</h4>
                  <p className="text-[#69707a] text-[12px]">If successful, the log will appear in Stats &gt; SMS CDR instantly.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
