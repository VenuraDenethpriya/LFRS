import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

function DashboardBarChart(props) {
  const chartConfig = {
    lost: {
      label: "Lost",
      color: "#fecdd3",
    },
    found: {
      label: "Found",
      color: "#d9f99d",
    },
  };

  return (
    <Card
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200
        shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl hover:shadow-xl transition-all duration-300"
    >
      <CardHeader className="bg-white/70">
        <CardTitle className="text-blue-900 font-semibold">{props.title}</CardTitle>
        <CardDescription className="text-blue-700">{props.description}</CardDescription>
      </CardHeader>

      <CardContent className="bg-white/60">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={props.chartData}>
            <CartesianGrid vertical={false} stroke="#cbd5e1" />
            <XAxis
              dataKey={props.chartData[0]?.month ? "month" : "district"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="#3b82f6" // blue axis line
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="lost" fill="var(--color-lost)" radius={4} />
            <Bar dataKey="found" fill="var(--color-found)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm bg-white/50 text-blue-700">
        <div className="leading-none">Reports grouped by month</div>
      </CardFooter>
    </Card>
  );
}

export default DashboardBarChart;
