import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  Wallet as WalletIcon,
  Building2,
  Coins,
  TrendingUp,
  TrendingDown,
  RotateCw,
  Copy,
  Check,
} from "lucide-react";


import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import RazorpayLogo from "@/assets/razorpay.svg";
import StripeLogo from "@/assets/stripe.svg";

export default function Wallet() {
  const [copied, setCopied] = useState(false);

  const walletId = "WLT-9F3A-82KD-44P";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [reloading, setReloading] = useState(false);
  const handleReload = () => {
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 1200);
  };

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
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />

          <CardContent className="relative p-6">
            <div className="flex flex-col gap-5">

              {/* Top Row: Balance + Actions */}
              <div className="flex items-center justify-between">
                {/* Balance */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <WalletIcon className="w-4 h-4" />
                    <span className="text-sm">Total Balance</span>
                  </div>
                  <div className="text-4xl font-semibold tracking-tight">
                    ₹24,500.00
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {/* Add */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary/90 hover:bg-primary">
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </DialogTrigger>
                    {/* DialogContent stays same as your code */}
                  </Dialog>

                  {/* Withdraw */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="bg-white/10 hover:bg-white/20"
                      >
                        <ArrowUpFromLine className="w-4 h-4 mr-2" />
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    {/* DialogContent stays same as your code */}
                  </Dialog>

                  {/* Transfer */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-white/20 bg-white/5 hover:bg-white/10"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Transfer
                      </Button>
                    </DialogTrigger>
                    {/* DialogContent stays same as your code */}
                  </Dialog>
                </div>
              </div>

              {/* Wallet ID Row */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium">Wallet ID:</span>

                <span className="font-mono text-foreground select-all">
                  WLT-9F3A-82KD-44P
                </span>

                <button
                  onClick={handleCopy}
                  className="
            group flex items-center justify-center
            h-8 w-8 rounded-lg
            border border-white/10
            bg-white/5
            hover:bg-white/10
            transition
          "
                  aria-label="Copy Wallet ID"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  )}
                </button>

                {copied && (
                  <span className="text-emerald-400 text-xs">
                    Copied
                  </span>
                )}
              </div>

            </div>
          </CardContent>
        </Card>


        {/* Glass Transaction History */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <CardContent className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Transaction History
              </h2>

              <button
                onClick={handleReload}
                disabled={reloading}
                className="
          group flex items-center gap-2
          px-3 py-2 rounded-xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          hover:bg-white/10
          transition-all duration-300
          disabled:opacity-60
        "
              >
                <RotateCw
                  className={`
            h-4 w-4 text-muted-foreground
            transition-transform duration-700
            ${reloading ? "animate-spin text-primary" : "group-hover:rotate-180"}
          `}
                />
                <span className="text-sm text-muted-foreground">Reload</span>
              </button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((tx) => {
                  const isCredit = tx.amount.startsWith("+");

                  const iconMap = {
                    "Add Money": Coins,
                    "Withdraw": ArrowUpFromLine,
                    "Transfer": Send,
                    "Buy": TrendingUp,
                    "Sell": TrendingDown,
                  };

                  const Icon = iconMap[tx.type] || Coins;

                  return (
                    <TableRow
                      key={tx.id}
                      className="border-white/10 hover:bg-white/5 transition"
                    >
                      {/* Type with Icon */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">

                          {/* Glass Icon Avatar */}
                          <div
                            className={`
                      h-9 w-9 flex items-center justify-center
                      rounded-xl border border-white/10
                      backdrop-blur-xl
                      ${isCredit
                                ? "bg-emerald-400/20 text-emerald-400"
                                : "bg-red-400/20 text-red-400"}
                    `}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <span>{tx.type}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {tx.date}
                      </TableCell>

                      <TableCell
                        className={`text-right font-semibold ${isCredit ? "text-primary" : "text-destructive"
                          }`}
                      >
                        {tx.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

          </CardContent>
        </Card>


      </div>
    </div>
  );
}
