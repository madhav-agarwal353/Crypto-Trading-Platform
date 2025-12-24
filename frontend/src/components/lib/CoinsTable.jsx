import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom';

const CoinsTable = (props) => {
    const navigate = useNavigate();
    const { coin, category } = props;
    // ✅ Format helpers (concise)
    const formatCompact = (num) =>
        num?.toLocaleString("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
        });

    const formatPrice = (num) =>
        num?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        });

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[220px] text-left">Coin</TableHead>
                    <TableHead className="text-left">Symbol</TableHead>
                    <TableHead className="text-left">Volume</TableHead>
                    <TableHead className="text-left">Market Cap</TableHead>
                    <TableHead className="text-left">24H</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {coin.map((c) => (
                    <TableRow
                        key={c.id}
                        className="h-20 cursor-pointer hover:bg-gray-800/60 transition-colors"
                        onClick={() => navigate(`/market/${c.id}`)}
                    >
                        {/* Coin */}
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={c.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>{c.name}</span>
                            </div>
                        </TableCell>

                        {/* Symbol */}
                        <TableCell className="uppercase">
                            {c.symbol}
                        </TableCell>

                        {/* Volume */}
                        <TableCell>
                            {formatCompact(c.total_volume)}
                        </TableCell>

                        {/* Market Cap */}
                        <TableCell>
                            {formatCompact(c.market_cap)}
                        </TableCell>

                        {/* 24H */}
                        <TableCell
                            className={
                                c.price_change_percentage_24h >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }
                        >
                            {Math.abs(c.price_change_percentage_24h)}%
                        </TableCell>

                        {/* Price */}
                        <TableCell className="text-right">
                            {formatPrice(c.current_price)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CoinsTable;
