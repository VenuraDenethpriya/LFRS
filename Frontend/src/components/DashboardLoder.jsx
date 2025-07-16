import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; // Adjust path as per your project
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if you have a Skeleton component
import { GoStack } from "react-icons/go"; // Assuming react-icons for the stack icon



function DashboardLoader() {
    return (
        <section className="py-6 px-10 animate-pulse">
            {/* Dashboard Cards Loader */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    <Skeleton className="h-8 w-64" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <Card key={index} className="bg-gray-200 rounded-3xl shadow-lg h-48">
                            <CardHeader className="flex items-center justify-between pb-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-12 w-12 rounded-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-10 w-1/2 mb-2" />
                                <Skeleton className="h-4 w-2/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Pie Charts Loader */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="gap-6">
                        <Card className="h-72">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GoStack className="h-5 w-5 text-gray-400" />
                                    <Skeleton className="h-6 w-56" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center h-[calc(100%-80px)]"> {/* Adjust height to fit content */}
                                <Skeleton className="h-48 w-48 rounded-full" />
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Line Chart Loader */}
            <div className="gap-6 mt-8">
                <Card className="py-4 sm:py-0">
                    <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                            <CardTitle>
                                <Skeleton className="h-6 w-48" />
                            </CardTitle>
                            <CardDescription>
                                <Skeleton className="h-4 w-64" />
                            </CardDescription>
                        </div>
                        <div className="flex">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <Skeleton className="aspect-auto h-[250px] w-full" />
                    </CardContent>
                </Card>
            </div>

            {/* Bar Charts Loader (by Month and by District) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                {[...Array(2)].map((_, index) => (
                    <div key={index}>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <Skeleton className="h-6 w-56" />
                                </CardTitle>
                                <CardDescription>
                                    <Skeleton className="h-4 w-48" />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-[250px] w-full" />
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <Skeleton className="h-4 w-40" />
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Bar Chart by Category Loader */}
            <div className="gap-6 mt-8">
                <Card className="py-0">
                    <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                            <CardTitle>
                                <Skeleton className="h-6 w-64" />
                            </CardTitle>
                            <CardDescription>
                                <Skeleton className="h-4 w-40" />
                            </CardDescription>
                        </div>
                        <div className="flex">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <Skeleton className="aspect-auto h-[250px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default DashboardLoader;