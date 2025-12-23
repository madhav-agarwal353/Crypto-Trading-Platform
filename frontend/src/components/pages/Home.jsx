import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import CoinsTable from "@/components/lib/CoinsTable";
import Chart from "@/components/lib/Chart";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList } from "../store/Coin/Action";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("all");
    const [page, setPage] = useState(1);

    // ✅ ONLY state.coin
    const coin = useSelector((state) => state.coin);

    // Fetch coins on page change
    useEffect(() => {
        dispatch(getCoinList(page));
    }, [dispatch, page]);

    // Category handler
    const handleCategory = useCallback((value) => {
        setCategory(value);
        setPage(1); // reset page when category changes
    }, []);

    // Pagination handler
    const goToPage = useCallback((value) => {
        setPage((prev) => (prev === value ? prev : value));
    }, []);

    return (
        <div className="relative h-[calc(100vh-70px)]">
            <div className="lg:flex">
                {/* LEFT SIDE */}
                <div className="lg:w-[50%] border-r h-[calc(100vh-70px)] flex flex-col">

                    {/* Top Buttons */}
                    <div className="p-7 flex items-center gap-4 shrink-0">
                        <Button
                            onClick={() => handleCategory("all")}
                            variant={category === "all" ? "default" : "outline"}
                        >
                            All
                        </Button>

                        <Button
                            onClick={() => handleCategory("top50")}
                            variant={category === "top50" ? "default" : "outline"}
                        >
                            Top 50
                        </Button>

                        <Button
                            onClick={() => handleCategory("gainer")}
                            variant={category === "gainer" ? "default" : "outline"}
                        >
                            Top Gainer
                        </Button>

                        <Button
                            onClick={() => handleCategory("loser")}
                            variant={category === "loser" ? "default" : "outline"}
                        >
                            Top Loser
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="flex-1 px-4 overflow-y-auto scrollbar-dark scroll-smooth">
                        <CoinsTable coin={coin.coins} category={category} />
                    </div>

                    {/* Pagination */}
                    <Pagination className="shrink-0 sticky bottom-0 bg-gray-900 flex justify-center items-center w-full z-30">
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => page > 1 && goToPage(page - 1)}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink isActive onClick={() => goToPage(page)}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink onClick={() => goToPage(page + 1)}>
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink onClick={() => goToPage(page + 2)}>
                                    {page + 2}
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext onClick={() => goToPage(page + 1)} />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden lg:block lg:w-[50%] p-7 h-[calc(100vh-4.25rem)] overflow-hidden">
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default Home;
