import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RazorpayLogo from "@/assets/razorpay.svg";
import StripeLogo from "@/assets/stripe.svg";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler, transferMoney, getUserWallet, getWalletTransactions } from "../store/Wallet/Action";
import { useEffect } from "react";
import { set } from "zod";



export default function Wallet() {
  const [walletId, setWalletId] = useState("");
  const [walletAmount, setWalletAmount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [reloading, setReloading] = useState(false);
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState("razorpay")

  const wallet = useSelector(state => state.wallet);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(getUserWallet(token));
    setWalletId(wallet.wallet.id);
    setWalletAmount(wallet.wallet.balance);
    dispatch(getWalletTransactions(token));
    console.log("Wallet Data:", wallet);
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount) return;
    dispatch(
      paymentHandler(
        localStorage.getItem("token"),
        Number(amount),
        paymentMethod
      )
    )
    console.log(amount);
  }
  const handleWithdraw = (e) => {
    e.preventDefault()
    if (!amount) return
    // dispatch(
    //   withdrawMoneyRequest({
    //     amount: Number(amount),
    //   })
    // )
    console.log(amount);
  }
  const handleTransfer = (e) => {
    e.preventDefault()

    if (!walletId || !amount) return
    dispatch(
      transferMoney(
        localStorage.getItem("token"),
        walletId,
        { amount: Number(amount) }
      )
    )
    console.log(amount);
  }
  const handleCopy = async () => {
    await navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleReload = () => {
    setReloading(true);
    setTimeout(() => setReloading(false), 1200);
  };

  /* ------------------ MOCK DATA ------------------ */
  const transactions = [
    { id: 1, type: "Add Money", amount: "+₹5,000", date: "2025-01-12" },
    { id: 2, type: "Transfer", amount: "-₹1,200", date: "2025-01-11" },
    { id: 3, type: "Withdraw", amount: "-₹800", date: "2025-01-10" },
    { id: 4, type: "Add Money", amount: "+₹2,000", date: "2025-01-09" },
  ];

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= GLASS BALANCE CARD ================= */}
        <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />

          <CardContent className="relative p-6 space-y-5">

            {/* Balance + Actions */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <WalletIcon className="w-4 h-4" />
                  Total Balance
                </div>
                <div className="text-4xl font-semibold mt-1">
                  ₹{walletAmount.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="flex gap-3">

                {/* ADD MONEY */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary/90 hover:bg-primary">
                      <ArrowDownToLine className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-black/60 backdrop-blur-2xl border border-white/10">
                    <DialogHeader>
                      <DialogTitle>Add Money</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          placeholder="₹ Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          type="number"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Method</Label>

                        <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                          <input
                            type="radio"
                            name="pay"
                            value="razorpay"
                            checked={paymentMethod === "razorpay"}
                            onChange={() => setPaymentMethod("razorpay")}
                          />
                          <img
                            src={RazorpayLogo}
                            className="h-8 bg-white rounded px-3"
                            alt="Razorpay"
                          />
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                          <input
                            type="radio"
                            name="pay"
                            value="stripe"
                            checked={paymentMethod === "stripe"}
                            onChange={() => setPaymentMethod("stripe")}
                          />
                          <img
                            src={StripeLogo}
                            className="h-8 bg-white rounded px-3"
                            alt="Stripe"
                          />
                        </label>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button type="submit">Proceed</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* WITHDRAW */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <ArrowUpFromLine className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-black/60 backdrop-blur-2xl border border-white/10">
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription>
                        Transfer to your bank
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleWithdraw} className="space-y-4">
                      <Input
                        type="number"
                        placeholder="₹ Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button type="submit" variant="destructive">
                          Withdraw
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* TRANSFER */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <Send className="w-4 h-4 mr-2" />
                      Transfer
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-black/60 backdrop-blur-2xl border border-white/10">
                    <DialogHeader>
                      <DialogTitle>Transfer Money</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleTransfer} className="space-y-3">
                      <Input
                        placeholder="Recipient Wallet ID"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                      />

                      <Input
                        type="number"
                        placeholder="₹ Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button type="submit">Send</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

              </div>
            </div>

            {/* Wallet ID */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              Wallet ID:
              <span className="font-mono text-foreground">{walletId}</span>

              <button
                onClick={handleCopy}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              {copied && <span className="text-emerald-400">Copied</span>}
            </div>

          </CardContent>
        </Card>

        {/* ================= TRANSACTIONS ================= */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Transaction History</h2>
              <button onClick={handleReload}>
                <RotateCw className={`h-4 w-4 ${reloading && "animate-spin"}`} />
              </button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map(tx => {
                  const isCredit = tx.amount.startsWith("+");
                  const Icon =
                    tx.type === "Add Money"
                      ? Coins
                      : tx.type === "Withdraw"
                        ? ArrowUpFromLine
                        : Send;

                  return (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center
                            ${isCredit ? "bg-emerald-400/20 text-emerald-400" : "bg-red-400/20 text-red-400"}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          {tx.type}
                        </div>
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell className={`text-right font-semibold ${isCredit ? "text-primary" : "text-destructive"}`}>
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
