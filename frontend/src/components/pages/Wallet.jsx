import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowDownToLine, ArrowUpFromLine, Send, Wallet as WalletIcon, Building2, Coins,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { RotateCw } from "lucide-react";
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary/90 hover:bg-primary">
                      <ArrowDownToLine className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="
    bg-black/60
    backdrop-blur-2xl
    border border-white/10
    shadow-xl
  ">
                    <DialogHeader>
                      <DialogTitle>Add Money</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">

                      {/* Amount */}
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="₹ Enter amount"
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-3">
                        <Label>Payment Method</Label>

                        <div className="grid gap-3">

                          {/* Razorpay */}
                          <label className="
            flex items-center gap-4 p-4
            rounded-xl cursor-pointer
            bg-white/5 border border-white/10
            hover:bg-white/10
            transition
          ">
                            <input
                              type="radio"
                              name="gateway"
                              value="razorpay"
                              defaultChecked
                              className="accent-primary"
                            />

                            <img
                              src={RazorpayLogo}
                              alt="Razorpay"
                              className="bg-gray-100 px-4 py-1 h-8 rounded-xl "
                            />
                          </label>

                          {/* Stripe */}
                          <label className="
            flex items-center gap-4 p-4
            rounded-xl cursor-pointer
            bg-white/5 border border-white/10
            hover:bg-white/10
            transition
          ">
                            <input
                              type="radio"
                              name="gateway"
                              value="stripe"
                              className="accent-primary"
                            />

                            <img
                              src={StripeLogo}
                              alt="Stripe"
                              className="bg-gray-100 px-4 h-10 rounded-xl"
                            />
                          </label>

                        </div>
                      </div>

                    </div>

                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button className="bg-primary/90 hover:bg-primary">
                        Proceed to Pay
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <ArrowUpFromLine className="w-4 h-4 mr-2" /> Withdraw
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    className="
      bg-black/60
      backdrop-blur-2xl
      border border-white/10
      shadow-xl
    "
                  >
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Transfer money to your linked bank account
                      </DialogDescription>
                    </DialogHeader>

                    {/* Icon Header */}
                    <div className="flex justify-center py-4">
                      <div className="
        flex items-center justify-center
        h-20 w-20
        rounded-2xl
        bg-gradient-to-br
        from-primary/30
        to-primary/5
        border border-white/10
        backdrop-blur-xl
      ">
                        <ArrowUpFromLine className="h-10 w-10 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-5">

                      {/* Amount */}
                      <div className="space-y-2">
                        <Label htmlFor="withdrawAmount">Withdrawal Amount</Label>
                        <Input
                          id="withdrawAmount"
                          type="number"
                          placeholder="₹ Enter amount"
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                      </div>

                      {/* Bank Info */}
                      <div className="
        rounded-xl
        bg-white/5
        border border-white/10
        p-4
        space-y-3
      ">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          Bank Details
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Account Holder</span>
                          <span className="font-medium">Rahul S***</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Account Number</span>
                          <span className="font-medium">**** **** 4321</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bank</span>
                          <span className="font-medium">HDFC Bank</span>
                        </div>
                      </div>

                    </div>

                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button variant="destructive">
                        Withdraw
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-white/20 bg-white/5 hover:bg-white/10"
                    >
                      <Send className="w-4 h-4 mr-2" /> Transfer
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="
    bg-black/60
    backdrop-blur-2xl
    border border-white/10
    shadow-xl
  ">
                    <DialogHeader>
                      <DialogTitle>Transfer Money</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Send money securely to another wallet
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="walletId">Recipient Wallet ID</Label>
                        <Input
                          id="walletId"
                          placeholder="Enter wallet ID or username"
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transferAmount">Amount</Label>
                        <Input
                          id="transferAmount"
                          type="number"
                          placeholder="₹ Enter amount"
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                      </div>

                      {/* Purpose */}
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Purpose (optional)</Label>
                        <Input
                          id="purpose"
                          placeholder="e.g. Rent, Gift, Investment"
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button className="bg-primary/90 hover:bg-primary">
                        Transfer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
