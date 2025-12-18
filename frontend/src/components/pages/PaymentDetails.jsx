import { useState } from "react";
import {
  Building2,
  Plus,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentDetails = () => {
  const [bankAdded, setBankAdded] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Payment Details</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary/90 hover:bg-primary">
                <Plus className="h-4 w-4 mr-2" /> Add Bank
              </Button>
            </DialogTrigger>

            {/* Add Bank Dialog */}
            <DialogContent className="bg-black/60 backdrop-blur-2xl border border-white/10">
              <DialogHeader>
                <DialogTitle>Add Bank Account</DialogTitle>
                <DialogDescription>
                  Enter your bank details to receive withdrawals
                </DialogDescription>
              </DialogHeader>

              {/* Icon */}
              <div className="flex justify-center py-4">
                <div className="h-20 w-20 flex items-center justify-center rounded-2xl
                  bg-gradient-to-br from-primary/30 to-primary/5
                  border border-white/10 backdrop-blur-xl">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
              </div>

              <div className="grid gap-4">

                <div>
                  <Label>Account Holder Name</Label>
                  <Input
                    placeholder="Enter full name"
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div>
                  <Label>Bank Name</Label>
                  <Input
                    placeholder="e.g. HDFC Bank"
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div>
                  <Label>Account Number</Label>
                  <Input
                    type="password"
                    placeholder="Enter account number"
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div>
                  <Label>Confirm Account Number</Label>
                  <Input
                    type="password"
                    placeholder="Re-enter account number"
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div>
                  <Label>IFSC Code</Label>
                  <Input
                    placeholder="e.g. HDFC0000123"
                    className="bg-white/5 border-white/10 uppercase"
                  />
                </div>

              </div>

              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-primary/90 hover:bg-primary">
                  Save Bank
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Bank Details Card */}
        {bankAdded ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Card className="
      cursor-pointer
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      shadow-lg
      hover:bg-white/10
      transition
    ">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 flex items-center justify-center rounded-xl
              bg-gradient-to-br from-primary/30 to-primary/5
              border border-white/10 backdrop-blur-xl">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">HDFC Bank</p>
                        <p className="text-sm text-muted-foreground">
                          Rahul S*** • **** **** 4321
                        </p>
                        <p className="text-sm text-muted-foreground">
                          IFSC: HDFC0000123
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      <Button
                        className="
    bg-red-700
    hover:bg-red-900
    font-semibold
    px-4 py-2
    rounded-xl
    shadow-lg shadow-black/20
  "
                      >
                        REMOVE ACCOUNT
                      </Button>

                    </span>
                  </div>
                </CardContent>
              </Card>
            </AlertDialogTrigger>

            {/* 🔴 Remove Confirmation */}
            <AlertDialogContent className="bg-black/70 backdrop-blur-2xl border border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Remove Bank Account?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  This bank account will be removed permanently.
                  You won’t be able to withdraw funds until a new bank is added.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/5 hover:bg-white/10">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => setBankAdded(false)}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Remove Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        ) : (
          <div className="text-muted-foreground text-center py-20">
            No bank account added yet
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentDetails;
