import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserWallet } from '../store/Wallet/Action'
import { payOrder } from "../store/Order/Action";
export default function TradeButton({
    stockName,
    stockPrice,
    ownedQuantity,
}) {
    const dispatch = useDispatch();
    const wallet = useSelector(state => state.wallet);
    const [walletBalance, setWallletBalance] = useState('');
    const [open, setOpen] = useState(false);
    const [tradeType, setTradeType] = useState("buy");
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        if (walletBalance === null || walletBalance === undefined) {
            dispatch(getUserWallet(localStorage.getItem('jwt')));
        }
    }, [dispatch, walletBalance]);

    useEffect(() => {
        setWallletBalance(wallet.wallet.balance);
    }, [wallet])

    const maxBuyQuantity = Math.floor(walletBalance / (stockPrice * 90));
    const maxSellQuantity = ownedQuantity;

    const maxQuantity = tradeType === "buy" ? maxBuyQuantity : maxSellQuantity;
    const amount = (quantity * stockPrice).toFixed(2);

    const handleQuantityInput = (value) => {
        const qty = Math.max(1, Math.min(maxQuantity || 1, Number(value)));
        setQuantity(qty);
    };

    const handleTrade = () => {
        console.log(stockName,
            quantity,
            tradeType)
        dispatch(payOrder({
            jwt: localStorage.getItem('jwt'),
            amount: Number(amount),
            orderData: {
                coinId: stockName,
                quantity: quantity, 
                orderType: tradeType.toUpperCase()
            }
        }))
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Trade</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Trade {stockName}</DialogTitle>
                    </DialogHeader>

                    {/* Buy / Sell Toggle */}
                    <Tabs
                        defaultValue="buy"
                        className="w-full"
                        onValueChange={(val) => {
                            setTradeType(val);
                            setQuantity(1);
                        }}
                    >
                        <TabsList className="grid grid-cols-2">
                            <TabsTrigger value="buy">Buy</TabsTrigger>
                            <TabsTrigger value="sell">Sell</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Stock Info */}
                    <div className="text-sm space-y-1 mt-4">
                        <p>Stock Price: <strong>${stockPrice}</strong></p>
                        {tradeType === "buy" ? (
                            <p>Available Cash: <strong>${walletBalance}</strong></p>
                        ) : (
                            <p>Owned Quantity: <strong>{ownedQuantity}</strong></p>
                        )}
                    </div>

                    {/* Quantity Input */}
                    <div className="mt-4 space-y-2">
                        <label className="text-sm font-medium">Quantity</label>
                        <Input
                            type="number"
                            value={quantity}
                            min={1}
                            max={maxQuantity || 1}
                            onChange={(e) => handleQuantityInput(e.target.value)}
                        />
                    </div>

                    {/* Quantity Slider */}
                    <div className="mt-4">
                        <Slider
                            value={[quantity]}
                            min={1}
                            max={maxQuantity || 1}
                            step={1}
                            onValueChange={(value) => setQuantity(value[0])}
                        />
                        <div className="flex justify-between text-xs mt-1">
                            <span>1</span>
                            <span>{maxQuantity || 1}</span>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="mt-4 text-sm">
                        <p>Total Amount</p>
                        <p className="text-lg font-semibold">${amount}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={quantity > maxQuantity}
                            className={
                                tradeType === "buy"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-red-600 hover:bg-red-700"
                            }
                            onClick={handleTrade}
                        >
                            {tradeType === "buy" ? "Buy" : "Sell"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
