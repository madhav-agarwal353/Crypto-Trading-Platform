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
const Portfolio = () => {
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
      invoice: "INV007",
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
      invoice: "INV007",
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
      invoice: "INV007",
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
      invoice: "INV007",
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
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  return (
    <Card className='mx-10 my-10 px-10 '>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Portfolio</CardTitle>
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
              <TableHead>Assets</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Change(%)</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="h-20">
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
                <TableCell className="text-right">end</TableCell>
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

export default Portfolio
