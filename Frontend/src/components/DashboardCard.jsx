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
            icon: <AlertTriangleIcon className="w-7 h-7 text-blue-600" />,
            gradient: "from-[#c2e9fb] to-[#81a4fd]",
            iconBg: "bg-blue-100",
        },
        {
            title: "Total Found Reports",
            value: totalFoundReports,
            icon: <PackageCheckIcon className="w-7 h-7 text-yellow-700" />,
            gradient: "from-[#ffe29f] to-[#ffa99f]",
            iconBg: "bg-yellow-100",
        },
        {
            title: "Total Pending Lost Reports",
            value: totalPendingLostReports,
            icon: <HourglassIcon className="w-7 h-7 text-green-700" />,
            gradient: "from-[#b7f8db] to-[#50a7c2]",
            iconBg: "bg-green-100",
        },
        {
            title: "Total Completed Lost Reports",
            value: totalCompletedLostReports,
            icon: <CheckCircleIcon className="w-7 h-7 text-red-700" />,
            gradient: "from-[#fbc2eb] to-[#a6c1ee]",
            iconBg: "bg-red-100",
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
