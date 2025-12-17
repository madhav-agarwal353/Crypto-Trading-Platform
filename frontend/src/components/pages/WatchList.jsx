import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BookmarkX } from 'lucide-react';
import { Button } from '../ui/button';
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV00543",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV00654",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV00122",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV0012121",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV0032",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV0043",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV0043",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV0090",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]
const WatchList = () => {
    const removeWatchListHandler = (item) => {
        console.log("hello")
    }
    return (
        <Card className='mx-10 my-10 px-10 '>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>WatchList</CardTitle>
                    <CardDescription className='pt-2'>
                        Your cryptocurrency holdings
                    </CardDescription>
                </div>

                <CardAction>
                    {/* <Button size="sm" variant="outline">View All</Button> */}
                </CardAction>
            </CardHeader>

            <CardContent className="p-0">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="text-xl">
                            <TableHead className="w-[100px]">Coin</TableHead>
                            <TableHead>SYMBOL</TableHead>
                            <TableHead>VOLUME</TableHead>
                            <TableHead>MARKET CAP</TableHead>
                            <TableHead>24H</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Remove</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {invoices.map((item) => (
                            <TableRow key={item.id} className="h-20">
                                <TableCell className="h-20 font-medium flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>Bitcoin</span>
                                </TableCell>

                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell>hi</TableCell>
                                <TableCell >end</TableCell>
                                <TableCell className="flex justify-end">
                                    <button
                                        onClick={() => removeWatchListHandler(item.id)}
                                        className="group
    flex items-center justify-center
    w-14 h-14
    rounded-full
    border border-destructive/30
    bg-background
    shadow-sm
    transition-all duration-200
    hover:bg-destructive/10
    hover:scale-105
    active:scale-95">
                                        <BookmarkX
                                            className=" w-8 h-8
                                                text-destructive
                                           transition-transform duration-200
                                            group-hover:rotate-6"
                                        />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="justify-end text-sm text-muted-foreground">
                Showing {invoices.length} assets
            </CardFooter>
        </Card>
    )
}

export default WatchList
