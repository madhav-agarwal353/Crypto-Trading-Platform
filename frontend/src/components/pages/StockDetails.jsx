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

const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-xl border p-4 bg-background">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">
        {value || "-"}
      </span>
    </div>
  );
};

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

        {coinDetails && (
          <Trade
            stockName={coinDetails.name}
            stockPrice={coinDetails.market_data.current_price.usd}
          // ownedQuantity={ownedQuantity}
          />
        )}


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
      {/* ================= COIN DETAILS ================= */}
      <div className="px-7 mt-12 space-y-10">

        {/* ===== KEY STATS ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Market Statistics</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <StatCard
              label="Market Cap"
              value={`$${coinDetails.market_data.market_cap.usd.toLocaleString()}`}
            />
            <StatCard
              label="24h Volume"
              value={`$${coinDetails.market_data.total_volume.usd.toLocaleString()}`}
            />
            <StatCard
              label="Circulating Supply"
              value={coinDetails.market_data.circulating_supply.toLocaleString()}
            />
            <StatCard
              label="Max Supply"
              value={
                coinDetails.market_data.max_supply
                  ? coinDetails.market_data.max_supply.toLocaleString()
                  : "∞"
              }
            />
            <StatCard
              label="All Time High"
              value={`$${coinDetails.market_data.ath.usd.toLocaleString()}`}
            />
            <StatCard
              label="All Time Low"
              value={`$${coinDetails.market_data.atl.usd.toLocaleString()}`}
            />
          </div>
        </div>

        {/* ===== ABOUT ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About {coinDetails.name}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {coinDetails.description.en || "No description available."}
          </p>
        </div>

        {/* ===== ADDITIONAL INFO ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Genesis Date" value={coinDetails.genesis_date} />
            <InfoRow label="Hashing Algorithm" value={coinDetails.hashing_algorithm} />
            <InfoRow
              label="Categories"
              value={coinDetails.categories?.join(", ")}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chart;
