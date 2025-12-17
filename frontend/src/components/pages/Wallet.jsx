import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownToLine, ArrowUpFromLine, Send, Wallet as WalletIcon } from "lucide-react";

export default function Wallet() {
  const transactions = [
    { id: 1, type: "Add Money", amount: "+₹5,000", date: "2025-01-12" },
    { id: 2, type: "Transfer", amount: "-₹1,200", date: "2025-01-11" },
    { id: 3, type: "Withdraw", amount: "-₹800", date: "2025-01-10" },
    { id: 4, type: "Add Money", amount: "+₹2,000", date: "2025-01-09" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Glass Balance Card */}
        <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <WalletIcon className="w-4 h-4" />
                  <span className="text-sm">Total Balance</span>
                </div>
                <div className="text-4xl font-semibold tracking-tight">₹24,500.00</div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-primary/90 hover:bg-primary">
                  <ArrowDownToLine className="w-4 h-4 mr-2" /> Add
                </Button>
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20">
                  <ArrowUpFromLine className="w-4 h-4 mr-2" /> Withdraw
                </Button>
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10">
                  <Send className="w-4 h-4 mr-2" /> Transfer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Glass Transaction History */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-white/10">
                    <TableCell className="font-medium">{tx.type}</TableCell>
                    <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${tx.amount.startsWith("+") ? "text-primary" : "text-destructive"}`}
                    >
                      {tx.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
