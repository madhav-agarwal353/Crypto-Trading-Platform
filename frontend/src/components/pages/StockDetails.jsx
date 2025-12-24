import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "../ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Trade from "@/components/lib/Trade";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCoinDetailsById,
  fetchMarketChartData,
} from "../store/Coin/Action";

const timeSeries = [
  { label: "1 Day", value: 1 },
  { label: "1 Week", value: 7 },
  { label: "1 Month", value: 30 },
  { label: "1 Year", value: 365 },
];

const Chart = () => {
  const [activeLabel, setActiveLabel] = useState("1 Day");
  const dispatch = useDispatch();
  const { id } = useParams();

  const { coinDetails, marketChart, loading } = useSelector(
    (state) => state.coin
  );

  const selectedRange = useMemo(
    () => timeSeries.find((t) => t.label === activeLabel)?.value,
    [activeLabel]
  );

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCoinDetailsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!id || !selectedRange) return;
    dispatch(fetchMarketChartData(id, selectedRange));
  }, [dispatch, id, selectedRange]);

  /* ================= CHART SERIES ================= */

  const series = useMemo(
    () => [
      {
        name: "Price",
        data: marketChart?.data?.prices || [],
      },
    ],
    [marketChart]
  );

  /* ================= THEME ================= */

  const theme = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return {
      primary: css.getPropertyValue("--primary").trim(),
      mutedFg: css.getPropertyValue("--muted-foreground").trim(),
      border: css.getPropertyValue("--border").trim(),
    };
  }, []);

  /* ================= CHART OPTIONS ================= */

  const options = useMemo(
    () => ({
      chart: {
        type: "area",
        height: 450,
        toolbar: { show: false },
        foreColor: theme.mutedFg,
        background: "transparent",
      },
      dataLabels: { enabled: false },
      xaxis: { type: "datetime" },

      // ✅ FIXED Y-AXIS FORMATTING
      yaxis: {
        labels: {
          formatter: (value) => {
            if (value >= 1) return `$${value.toFixed(2)}`;
            if (value >= 0.01) return `$${value.toFixed(4)}`;
            return `$${value.toFixed(6)}`;
          },
        },
      },

      stroke: { curve: "smooth", width: 2 },
      colors: [theme.primary],
      grid: { borderColor: theme.border },

      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0.6,
        },
      },

      tooltip: {
        theme: "dark",
        x: { format: "dd MMM yyyy HH:mm" },
        y: {
          formatter: (value) => `$${value.toFixed(6)}`,
        },
      },
    }),
    [theme]
  );

  /* ================= LOADING ================= */

  if (loading || !coinDetails) {
    return <div className="p-10">Loading...</div>;
  }

  /* ================= UI ================= */

  return (
    <div className="w-screen p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center px-7 pb-10">
        <div className="flex gap-3">
          <Avatar className="h-14 w-14">
            <AvatarImage src={coinDetails?.image?.large} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex gap-2">
              <p className="capitalize">{coinDetails?.symbol}</p>
              <p className="text-gray-400">{coinDetails?.name}</p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-xl font-bold">
                ${coinDetails?.market_data?.current_price?.usd}
              </p>
              <p
                className={
                  coinDetails?.market_data?.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {Math.abs(
                  coinDetails?.market_data?.price_change_percentage_24h || 0
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>

        <Trade />
      </div>

      {/* TIME BUTTONS */}
      <div className="flex gap-2 px-7">
        {timeSeries.map((item) => (
          <Button
            key={item.label}
            variant={activeLabel === item.label ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLabel(item.label)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* CHART */}
      <div className="h-[65vh] px-7 mt-5">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Chart;
