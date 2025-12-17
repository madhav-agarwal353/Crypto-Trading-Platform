import React from 'react'
import ReactApexChart from "react-apexcharts";
import { Button } from '../ui/button';
import { useState } from 'react';
const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Daily Time Series",
        lable: "1 Day",
        value: 1,
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        lable: "1 Week",
        value: 7,
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        lable: "1 Month",
        value: 30,
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Yearly Time Series",
        lable: "1 Year",
        value: 365,
    }
]
const Chart = () => {
    const [activeLabel, setactiveLabel] = useState("1 Day")
    const handleActiveLable = (value) => {
        setactiveLabel(value)
    }
    const series = [
        {
            data: [
                [
                    1765821044342,
                    85826.3215367044
                ],
                [
                    1765821401604,
                    85777.69121138651
                ],
                [
                    1765821643636,
                    85704.70802098143
                ],
                [
                    1765822056448,
                    85768.46872770182
                ],
                [
                    1765822295533,
                    85868.0892522114
                ],
                [
                    1765822583103,
                    85879.03458503864
                ],
                [
                    1765822861595,
                    85816.4093883662
                ],
                [
                    1765823222152,
                    85708.40346609351
                ],
                [
                    1765823512001,
                    85533.48764020638
                ],
                [
                    1765823722185,
                    85427.00157698385
                ],
                [
                    1765824055842,
                    85495.14459573166
                ],
                [
                    1765824336518,
                    85733.7248469109
                ],
                [
                    1765824702159,
                    85880.25899213941
                ],
                [
                    1765825013470,
                    86047.29407816313
                ],
                [
                    1765825313678,
                    86173.54692397923
                ],
                [
                    1765825562003,
                    86452.29196079183
                ],
                [
                    1765825902450,
                    86259.59772203844
                ],
                [
                    1765826222226,
                    85950.64332225492
                ],
                [
                    1765826542064,
                    86117.4434794464
                ],
                [
                    1765826702853,
                    86297.05204197983
                ],
                [
                    1765827023619,
                    86175.27419102294
                ],
                [
                    1765827322355,
                    86236.82365773227
                ],
                [
                    1765827672994,
                    86246.36240382002
                ],
                [
                    1765827951749,
                    86198.80449549612
                ],
                [
                    1765828242947,
                    86152.5145177193
                ],
                [
                    1765828612771,
                    86181.20146652157
                ],
                [
                    1765828942797,
                    86025.87478170796
                ],
                [
                    1765829226476,
                    86060.35150138843
                ],
                [
                    1765829525068,
                    85912.7212468686
                ],
                [
                    1765829821763,
                    85771.45256477904
                ],
                [
                    1765830081896,
                    85723.33567624667
                ],
                [
                    1765830412060,
                    85826.31462238781
                ],
                [
                    1765830717545,
                    85758.86936659052
                ],
                [
                    1765830983978,
                    85893.81562619265
                ],
                [
                    1765831275521,
                    85998.30053133675
                ],
                [
                    1765831562426,
                    85934.14417645805
                ],
                [
                    1765831882665,
                    85833.4998903194
                ],
                [
                    1765832174577,
                    85872.82820143073
                ],
                [
                    1765832499650,
                    85803.51861744869
                ],
                [
                    1765832921002,
                    85595.30199585418
                ],
                [
                    1765833122001,
                    85637.89087212687
                ],
                [
                    1765833302352,
                    85626.41148315213
                ],
                [
                    1765833660990,
                    85792.73183834547
                ],
                [
                    1765833992869,
                    85983.62971887979
                ],
                [
                    1765834271046,
                    86110.93632401437
                ],
                [
                    1765834621972,
                    86040.75241495795
                ],
                [
                    1765834841552,
                    86133.29446798521
                ],
                [
                    1765835142076,
                    86025.27749437868
                ],
                [
                    1765835445204,
                    86092.0284488738
                ],
                [
                    1765835741927,
                    86162.7261401283
                ],
                [
                    1765836043188,
                    86217.69481699889
                ],
                [
                    1765836335233,
                    86054.50421277169
                ],
                [
                    1765836713415,
                    86061.31143807167
                ],
                [
                    1765837021365,
                    86029.45857577528
                ],
                [
                    1765837342886,
                    86010.56718081291
                ],
                [
                    1765837655792,
                    85974.90238063005
                ],
                [
                    1765837833210,
                    85994.7285681194
                ],
                [
                    1765838183603,
                    86065.87251394978
                ],
                [
                    1765838532400,
                    86051.04281263736
                ],
                [
                    1765838761890,
                    86042.54307229833
                ],
                [
                    1765839061669,
                    86018.77996763759
                ],
                [
                    1765839307658,
                    86115.3087389092
                ],
                [
                    1765839901837,
                    86275.91028904021
                ],
                [
                    1765840052012,
                    86324.26871700559
                ],
                [
                    1765840321955,
                    86422.94334348993
                ],
                [
                    1765840633227,
                    86344.38441112016
                ],
                [
                    1765840914818,
                    86224.12270005971
                ],
                [
                    1765841245273,
                    86194.97079962517
                ],
                [
                    1765841543457,
                    86210.44382341554
                ],
                [
                    1765841821813,
                    86362.7169626883
                ],
                [
                    1765842041320,
                    86421.10605834865
                ],
                [
                    1765842373192,
                    86437.19879988712
                ],
                [
                    1765842677298,
                    86389.57455166618
                ],
                [
                    1765842972325,
                    86413.9190195637
                ],
                [
                    1765843293090,
                    86413.22138097929
                ],
                [
                    1765843602884,
                    86451.29845039116
                ],
                [
                    1765843914195,
                    86366.04289110035
                ],
                [
                    1765844233482,
                    86244.38122948077
                ],
                [
                    1765844530596,
                    86361.49354949562
                ],
                [
                    1765844846326,
                    86365.5314654452
                ],
                [
                    1765845047189,
                    86343.38284210733
                ],
                [
                    1765845421475,
                    86202.89415430711
                ],
                [
                    1765845681667,
                    86159.57699135016
                ],
                [
                    1765846052613,
                    86084.47049335991
                ],
                [
                    1765846282362,
                    86073.11379097855
                ],
                [
                    1765846585708,
                    85960.97181041112
                ],
                [
                    1765846912176,
                    85814.24822225161
                ],
                [
                    1765847212295,
                    85998.08540402011
                ],
                [
                    1765847522018,
                    86081.52619221777
                ],
                [
                    1765847820889,
                    86127.43947959424
                ],
                [
                    1765848132982,
                    85929.68081910361
                ],
                [
                    1765848441629,
                    85992.45213077887
                ],
                [
                    1765848671172,
                    85908.20312243262
                ],
                [
                    1765848922115,
                    85954.78542482518
                ],
                [
                    1765849222084,
                    85756.5319460561
                ],
                [
                    1765849574866,
                    85851.9121827274
                ],
                [
                    1765849822271,
                    85777.43246977993
                ],
                [
                    1765850187791,
                    85869.09032791835
                ],
                [
                    1765850434252,
                    85900.22101168243
                ],
                [
                    1765850723121,
                    85892.25322068507
                ]
            ]
        }
    ]
    const css = getComputedStyle(document.documentElement);

    const primary = css.getPropertyValue('--primary').trim();
    const primaryFg = css.getPropertyValue('--primary-foreground').trim();
    const border = css.getPropertyValue('--border').trim();
    const mutedFg = css.getPropertyValue('--muted-foreground').trim();
    const background = css.getPropertyValue('--background').trim();
    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 450,
            zoom: { autoScaleYaxis: true },
            foreColor: mutedFg,
            background: "transparent",
            toolbar: { show: false }
        },

        dataLabels: { enabled: false },

        xaxis: {
            type: "datetime",
            tickAmount: 6,
            labels: {
                style: { colors: mutedFg }
            }
        },

        yaxis: {
            labels: {
                style: { colors: mutedFg }
            }
        },

        colors: [primary],

        stroke: {
            curve: "smooth",
            width: 2
        },

        markers: {
            size: 3,
            colors: [primary],
            strokeColors: background,
            strokeWidth: 2,
            hover: { size: 6 }
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 0.6,
                opacityFrom: 0.5,
                opacityTo: 0.6,
                stops: [0, 90, 100]
            }
        },

        grid: {
            borderColor: border,
            strokeDashArray: 4,
            padding: {
                top: 10,
                right: 12,
                bottom: 0,
                left: 12
            }
        },

        tooltip: {
            theme: "dark",
            style: {
                fontSize: "12px"
            }
        }
    };


    return (
        <div className='sticky'>
            <div className="flex items-center gap-2">
                {timeSeries.map((item) => (
                    <Button
                        key={item.lable}
                        variant={activeLabel == item.lable ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleActiveLable(item.lable)}
                        className="capitalize p-4">
                        {item.lable}
                    </Button>
                ))}
            </div>

            <div id="chart-timeline sticky">
                <div className="h-[70vh] mb-5">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="area"
                        height="100%"
                    />
                </div>
            </div>
        </div >
    )
}

export default Chart;

// export default Chart
// import React, { useEffect, useRef } from "react";
// import ReactApexChart from "react-apexcharts";
// import ApexCharts from "apexcharts";

// const TWO_HOURS = 2 * 60 * 60 * 1000;
// const CHART_ID = "realtime-chart";

// export default function Chart() {
//   const socketRef = useRef(null);
//   const dataRef = useRef([]);

//   /* ================================
//      LOAD HISTORY ONCE
//      ================================ */
//   useEffect(() => {
//     async function loadHistory() {
//       const end = Date.now();
//       const start = end - TWO_HOURS;

//       const res = await fetch(
//         `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&startTime=${start}&endTime=${end}`
//       );

//       const klines = await res.json();

//       dataRef.current = klines.map((k) => [
//         k[0],
//         parseFloat(k[4]),
//       ]);

//       ApexCharts.exec(CHART_ID, "updateSeries", [
//         { data: dataRef.current },
//       ]);
//     }

//     loadHistory();
//   }, []);

//   /* ================================
//      REAL-TIME TICKS (APPEND ONLY)
//      ================================ */
//   useEffect(() => {
//     socketRef.current = new WebSocket(
//       "wss://stream.binance.com:9443/ws/btcusdt@trade"
//     );

//     socketRef.current.onmessage = (event) => {
//       const trade = JSON.parse(event.data);
//       const point = [trade.T, parseFloat(trade.p)];

//       dataRef.current.push(point);

//       // keep sliding window
//       const cutoff = Date.now() - TWO_HOURS;
//       dataRef.current = dataRef.current.filter((p) => p[0] >= cutoff);

//       ApexCharts.exec(CHART_ID, "appendData", [
//         { data: [point] },
//       ]);
//     };

//     return () => socketRef.current?.close();
//   }, []);

//   /* ================================
//      CHART OPTIONS
//      ================================ */
//   const options = {
//     chart: {
//       id: CHART_ID,
//       type: "area",
//       animations: { enabled: false },
//       toolbar: { show: false },
//       zoom: { enabled: false },
//     },

//     xaxis: {
//       type: "datetime",
//       range: TWO_HOURS,
//       labels: { format: "HH:mm" },
//     },

//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },

//     tooltip: {
//       x: { format: "HH:mm:ss" },
//     },
//   };

//   return (
//     <ReactApexChart
//       options={options}
//       series={[{ data: [] }]} // initial empty
//       type="area"
//       height={500}
//     />
//   );
// }
