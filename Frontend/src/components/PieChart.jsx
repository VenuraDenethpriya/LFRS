import { GoStack } from "react-icons/go";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function DashboardPieChart({ description, ReportStatusData }) {
    return (
        <section>
            <Card
                className="h-80 bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl hover:shadow-xl transition-all duration-300"
            >
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-blue-800 text-lg font-semibold">
                        <GoStack className="h-5 w-5 text-blue-700" />
                        {description}
                    </CardTitle>
                </CardHeader>

                <CardContent className="h-full">
                    <ChartContainer
                        config={{
                            removed: { label: "Removed", color: "#6b46c1" },          // Purple
                            notCollected: { label: "Not Collected", color: "#718096" }, // Grayish Blue
                            informed: { label: "Informed", color: "#dd6b20" },        // Orange (warning)
                            found: { label: "Found", color: "#38a169" },              // Medium Green
                            lost: { label: "Lost", color: "#e53e3e" },                // Strong Red
                            collected: { label: "Collected", color: "#4a5568" },      // Dark Slate Gray
                        }}
                        className="h-[240px] mt-2"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ReportStatusData}
                                    cx="80%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    dataKey="value"
                                    stroke="#fff"
                                    strokeWidth={2}
                                >
                                    {ReportStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </section>
    );
}

export default DashboardPieChart;
