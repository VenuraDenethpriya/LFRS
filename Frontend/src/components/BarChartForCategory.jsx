"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

const chartConfig = {
  lost: {
    label: "Lost",
    color: "#dc2626",
  },
  found: {
    label: "Found",
    color: "#16a34a",
  },
};

function BarChartForCategory(props) {
  const [activeChart, setActiveChart] = React.useState("lost");

  // Calculate total for each category for display in buttons
  const total = React.useMemo(() => {
    return {
      lost: props.chartData.reduce((acc, curr) => acc + (curr.lost || 0), 0),
      found: props.chartData.reduce((acc, curr) => acc + (curr.found || 0), 0),
    };
  }, [props.chartData]);

  return (
    <Card
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200
      shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl hover:shadow-xl transition-all duration-300 py-0"
    >
      <CardHeader className="bg-white/70 flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle className="text-blue-900 font-semibold">
            Lost & Found Reports by Category
          </CardTitle>
          <CardDescription className="text-blue-700">
            Group by category
          </CardDescription>
        </div>
        <div className="flex">
          {["lost", "found"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left
              even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6
              text-blue-900 font-semibold
              hover:bg-blue-200 transition"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-blue-700 text-xs">{chartConfig[key].label}</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="bg-white/60 px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={props.chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} stroke="#cbd5e1" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              stroke="#3b82f6" // blue axis line
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-[150px]" nameKey="Reports" />
              }
            />
            <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default BarChartForCategory;
