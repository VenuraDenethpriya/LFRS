import DashboardBarChart from "@/components/BarChart";
import BarChartForCategory from "@/components/BarChartForCategory";
import DashboardCard from "@/components/DashboardCard";
import DashboardLoder from "@/components/DashboardLoder";
import DashboardLineChart from "@/components/LineChart,";
import DashboardPieChart from "@/components/PieChart";
import { Button } from "@/components/ui/button";
import { useGetDashboardDataQuery } from "@/lib/api";
import { format } from "date-fns";
import { ChartNoAxesCombined } from "lucide-react";
import { Link } from "react-router";

function PoliceDashboard() {
    const { data, isLoading, error } = useGetDashboardDataQuery();

    // HEX values for chart fills, matching your badge colors but aiming for better visibility in charts
    const LostReportStatusData = [
    { name: "LOST", value: data?.LostReportTotal, fill: "#ef4444" },          // Indigo 500
    { name: "FOUND", value: data?.LostFoundReportTotal, fill: "#84cc16" },    // Emerald 500
    { name: "IMFORMED", value: data?.InformedReportTotal, fill: "#f59e0b" },  // Amber 500
    { name: "COLLECTED", value: data?.CollectedReportTotal, fill: "#3b82f6" },// Blue 500
    { name: "REMOVED", value: data?.RemoveReportTotal, fill: "#9ca3af" },     // Gray 400
    { name: "NOT COLLECTED", value: data?.NotCollectedReportTotal, fill: "#8b5cf6" }, // Violet 500
];

const FoundReportStatusData = [
    { name: "FOUND", value: data?.FoundReportTotal, fill: "#84cc16" },        // Emerald 500
    { name: "IMFORMED", value: data?.InformedFoundReportTotal, fill: "#f59e0b" }, // Amber 500
    { name: "COLLECTED", value: data?.ClaimedFoundReportTotal, fill: "#3b82f6" }, // Blue 500
    { name: "REMOVED", value: data?.RemoveFoundReportTotal, fill: "#9ca3af" },    // Gray 400
    { name: "NOT COLLECTED", value: data?.NotCollectedFoundReportTotal, fill: "#8b5cf6" }, // Violet 500
];


    const LostReportchartData = data?.TotalLostReportForLast3Months?.map(item => ({
        date: item.date,
        lost: item.total
    })) || [];

    const FoundReportchartData = data?.TotalFoundReportForLast3Months?.map(item => ({
        date: item.date,
        found: item.total
    })) || [];

    // Helper function to group by month
    function groupByMonth(data, type) {
        const result = {};
        data?.forEach(item => {
            const month = format(new Date(item.date), "MMMM"); // e.g., "July"
            if (!result[month]) result[month] = { month, lost: 0, found: 0 };
            result[month][type] += item.total;
        });
        return result;
    }

    // Create merged dataset
    const lostByMonth = groupByMonth(data?.TOtalLostREportInEveryMonth, "lost");
    const foundByMonth = groupByMonth(data?.TotalFoundReportForLast3Months, "found");

    // Merge both objects
    const combined = { ...lostByMonth };
    for (const month in foundByMonth) {
        if (combined[month]) {
            combined[month].found = foundByMonth[month].found;
        } else {
            combined[month] = foundByMonth[month];
        }
    }

    // Final array for chart
    const chartData = Object.values(combined);

    // Combine lost and found reports by district
    function combineDistrictData(lostReports, foundReports) {
        const result = {};

        lostReports?.forEach(item => {
            const district = item.district;
            if (!result[district]) result[district] = { district, lost: 0, found: 0 };
            result[district].lost += item.total;
        });

        foundReports?.forEach(item => {
            const district = item.district;
            if (!result[district]) result[district] = { district, lost: 0, found: 0 };
            result[district].found += item.total;
        });

        return Object.values(result);
    }

    // Prepare chart data
    const districtChartData = combineDistrictData(
        data?.TotalLostReportBassedOnDistric,
        data?.TotalFoundReportBassedOnDistric
    );

    const lostCategoryCounts = {};

    data?.TotalLostReportByCategory.forEach((item) => {
        item.category.forEach((cat) => {
            lostCategoryCounts[cat] = (lostCategoryCounts[cat] || 0) + item.total;
        });
    });

    const foundCategoryCounts = {};

    data?.TotalFoundReportByCategory.forEach((item) => {
        item.category.forEach((cat) => {
            foundCategoryCounts[cat] = (foundCategoryCounts[cat] || 0) + item.total;
        });
    });

    const allCategories = new Set([
        ...Object.keys(lostCategoryCounts),
        ...Object.keys(foundCategoryCounts),
    ]);

    const chartDataByCategory = Array.from(allCategories).map((cat) => ({
        category: cat,
        lost: lostCategoryCounts[cat] || 0,
        found: foundCategoryCounts[cat] || 0,
    }));

    const totalLostReports = data?.AllLostReportTotal
    const totalFoundReports = data?.AllFoundReportTotal
    const totalPendingLostReports = data?.LostFoundReportTotal + data?.InformedReportTotal + data?.NotCollectedReportTotal
    const totalCompletedLostReports = totalLostReports - totalPendingLostReports


    if (isLoading) {
        return <DashboardLoder />
    }
    return (
        <section
            className="
    px-6 md:px-10 py-10
    min-h-screen
    bg-gradient-to-br from-blue-50 via-white to-blue-100
    backdrop-blur-md
    rounded-3xl
    shadow-[0_15px_40px_rgba(14,165,233,0.2)]
    border border-blue-200
    text-blue-900
  "
        >
            {/* Header Section */}
            <div
                className="
      flex flex-col md:flex-row justify-between items-center
      bg-white/70
      p-6
      rounded-3xl
      shadow-lg
      border border-blue-200
      mb-8
      backdrop-blur-sm
    "
            >
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                        <ChartNoAxesCombined className="flex" />
                        <h2 className="text-3xl font-extrabold text-blue-900">
                            Police Dashboard Overview
                        </h2>
                    </div>


                    <p className="text-sm text-blue-700 mt-1">
                        Monitor and manage lost and found reports in real time.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/lostreport">
                        <Button
                            variant="outline"
                            className="
            flex items-center gap-2 px-5 py-2.5
            text-white
            bg-red-600 hover:bg-red-700
            border-none rounded-xl
            shadow-md
            transition-all duration-200
          "
                        >
                            + Lost Report
                        </Button>
                    </Link>

                    <Link to="/foundreport">
                        <Button
                            variant="outline"
                            className="
            flex items-center gap-2 px-5 py-2.5
            text-white
            bg-lime-600 hover:bg-lime-700
            border-none rounded-xl
            shadow-md
            transition-all duration-200
          "
                        >
                            + Found Report
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistic Cards */}
            <div className="mb-10">
                <DashboardCard
                    totalLostReports={totalLostReports}
                    totalFoundReports={totalFoundReports}
                    totalPendingLostReports={totalPendingLostReports}
                    totalCompletedLostReports={totalCompletedLostReports}
                    className="bg-white/70 rounded-3xl shadow-lg border border-blue-200 backdrop-blur-sm"
                />
            </div>

            {/* Pie Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DashboardPieChart
                    description="Lost Reports Status Distribution"
                    ReportStatusData={LostReportStatusData}
                />
                <DashboardPieChart
                    description="Found Reports Status Distribution"
                    ReportStatusData={FoundReportStatusData}
                />
            </div>

            {/* Line Chart */}
            <div className="mt-10">
                <DashboardLineChart
                    lostchartData={LostReportchartData}
                    foundchartData={FoundReportchartData}
                />
            </div>

            {/* Bar Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <DashboardBarChart
                    title="Lost & Found Reports by Month"
                    chartData={chartData}
                    description="Grouped by Month"
                />
                <DashboardBarChart
                    title="Lost & Found Reports by District"
                    chartData={districtChartData}
                    description="Grouped by District"
                />
            </div>

            {/* Category Bar Chart */}
            <div className="mt-10">
                <BarChartForCategory chartData={chartDataByCategory} />
            </div>
        </section>

    );

}

export default PoliceDashboard;
