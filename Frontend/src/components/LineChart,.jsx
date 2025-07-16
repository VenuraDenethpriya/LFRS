"use client";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

function DashboardLineChart(props) {

    const chartConfig = {
        views: {
            label: "Reports",
        },
        lost: {
            label: "Lost",
            color: "#1d4ed8",
        },
        found: {
            label: "Found",
            color: "#1d4ed8",
        },
    };

    const [activeChart, setActiveChart] = React.useState("lost");

    const mergedChartData = React.useMemo(() => {
        const merged = {};

        props.lostchartData.forEach(item => {
            if (!merged[item.date]) merged[item.date] = { date: item.date };
            merged[item.date].lost = item.lost;
        });

        props.foundchartData.forEach(item => {
            if (!merged[item.date]) merged[item.date] = { date: item.date };
            merged[item.date].found = item.found;
        });

        return Object.values(merged).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [props.lostchartData, props.foundchartData]);

    const total = React.useMemo(() => {
        return {
            lost: props.lostchartData.reduce((acc, curr) => acc + curr.lost, 0),
            found: props.foundchartData.reduce((acc, curr) => acc + curr.found, 0),
        };
    }, [props.lostchartData, props.foundchartData]);

    return (
        <Card
  className="py-4 sm:py-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 
    shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl hover:shadow-xl transition-all duration-300"
>
  <CardHeader className="flex flex-col items-stretch border-b border-blue-200 !p-0 sm:flex-row bg-white/70">
    <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
      <CardTitle className="text-blue-900 font-semibold text-lg">All Reports</CardTitle>
      <CardDescription className="text-blue-700">
        Showing total reports for the last 12 months
      </CardDescription>
    </div>
    <div className="flex">
      {["lost", "found"].map((key) => {
        const chart = key;
        return (
          <button
            key={chart}
            data-active={activeChart === chart}
            className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            onClick={() => setActiveChart(chart)}
          >
            <span className="text-blue-700 text-xs">
              {chartConfig[chart].label}
            </span>
            <span className="text-blue-900 text-lg leading-none font-bold sm:text-3xl">
              {total[chart].toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  </CardHeader>

  <CardContent className="px-2 sm:p-6">
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={mergedChartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} stroke="#cbd5e1" /> {/* lighter grid */}
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
          stroke="#3b82f6" // blue axis color
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="views"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
          }
        />
        <Line
          dataKey={activeChart}
          type="monotone"
          stroke={`var(--color-${activeChart})`}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  </CardContent>
</Card>

    );
}

export default DashboardLineChart;
