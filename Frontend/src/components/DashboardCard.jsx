import React, { useEffect, useState } from "react";
import {
    AlertTriangleIcon,
    CheckCircleIcon,
    HourglassIcon,
    PackageCheckIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function DashboardCard({
    totalLostReports,
    totalFoundReports,
    totalPendingLostReports,
    totalCompletedLostReports,
}) {
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const now = new Date();
        const formatted = now.toLocaleString("en-GB", {
            dateStyle: "short",
            timeStyle: "short",
        });
        setLastUpdated(formatted);
    }, []);

        const stats = [
    {
        title: "Total Lost Reports",
        value: totalLostReports,
        icon: <AlertTriangleIcon className="w-7 h-7 text-[#1D4ED8]" />, // Indigo-700
        gradient: "from-[#DBEAFE] to-[#3B82F6]", // Blue-ish gradient
        iconBg: "bg-[#E0F2FE]", // Light Blue-100
    },
    {
        title: "Total Found Reports",
        value: totalFoundReports,
        icon: <PackageCheckIcon className="w-7 h-7 text-[#047857]" />, // Emerald-700
        gradient: "from-[#D1FAE5] to-[#10B981]", // Green gradient
        iconBg: "bg-[#ECFDF5]", // Light Green-100
    },
    {
        title: "Total Pending Lost Reports",
        value: totalPendingLostReports,
        icon: <HourglassIcon className="w-7 h-7 text-[#CA8A04]" />, // Amber-600
        gradient: "from-[#FEF3C7] to-[#FACC15]", // Yellow/Amber gradient
        iconBg: "bg-[#FFFBEB]", // Light Amber-100
    },
    {
        title: "Total Completed Lost Reports",
        value: totalCompletedLostReports,
        icon: <CheckCircleIcon className="w-7 h-7 text-[#0F766E]" />, // Teal-700
        gradient: "from-[#CCFBF1] to-[#14B8A6]", // Teal gradient
        iconBg: "bg-[#E6FFFA]", // Light Teal-100
    },
];
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className={`
                            bg-gradient-to-br ${stat.gradient} text-gray-900 rounded-2xl
                            shadow-md hover:shadow-xl transition-all duration-300
                            transform hover:-translate-y-1 hover:scale-[1.02]
                            border border-gray-200 dark:border-gray-700
                        `}
                    >
                        <CardHeader className="flex items-center justify-between pb-3 px-6 pt-6">
                            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-900">
                                {stat.title}
                            </CardTitle>
                            <div
                                className={`p-3 rounded-full ${stat.iconBg} shadow-inner-sm border border-white/50`}
                            >
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 flex items-center justify-center h-[80px]">
                            <div className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                                {stat.value}
                            </div>
                        </CardContent>

                    </Card>
                ))}
            </div>

            {/* Timestamp below the cards */}
            <div className="mt-4 text-sm text-gray-600 text-right pr-2">
                Last updated: {lastUpdated}
            </div>
        </div>
    );
}

export default DashboardCard;
