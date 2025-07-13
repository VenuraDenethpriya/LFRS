"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, User, FileText, Camera, Shield, Hash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useGetFoundReportByIdQuery, useGetLostReportByIdQuery } from "@/lib/api"
import { useParams } from "react-router"



function ReportView() {
    const { id, type } = useParams()
    console.log(type)

    const lostQuery = useGetLostReportByIdQuery(id);
    const foundQuery = useGetFoundReportByIdQuery(id);

    const report = type === "lost" ? lostQuery.data : foundQuery.data;
    const isLoading = type === "lost" ? lostQuery.isLoading : foundQuery.isLoading;
    const isError = type === "lost" ? lostQuery.isError : foundQuery.isError;
    const error = type === "lost" ? lostQuery.error : foundQuery.error;



    // const { data: LostReport, isLoading: isLostLoading, isError: isLostError, error: lostError } = useGetLostReportByIdQuery(id)
    // const { data: FoundReport, isLoading: isFoundLoading, isError: isFoundError, error: foundError } = useGetFoundReportByIdQuery(id)
    // const report = LostReport || FoundReport
    // const isLoading = isLostLoading || isFoundLoading
    // const isError = isLostError || isFoundError
    // const error = lostError || foundError

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "lost":
                return "destructive"
            case "found":
                return "default"
            case "resolved":
                return "secondary"
            default:
                return "outline"
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-6 px-10">
                <div className="space-y-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="h-48 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-32 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
           <div className="container mx-auto py-6 px-10">
                <Alert variant="destructive">
                    <AlertDescription>Error loading report: {error?.message || "Something went wrong"}</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (!report) {
        return (
           <div className="container mx-auto py-6 px-10">
                <Alert>
                    <AlertDescription>No report found with the provided ID.</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6 px-10">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center  gap-12">
                    <div className="flex-1 flex items-center justify-between sm:justify-start space-x-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{type === "lost" ? "Lost Item Report" : "Found Item Report"}</h1>
                            <p className="text-gray-600 mt-1">Reference: {report?.referanceNo}</p>
                        </div>
                        <Badge variant={getStatusColor(report.status)} className="w-fit rounded-full py-2 px-4">
                            {report?.status}
                        </Badge>
                    </div>
                    <div>
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-6 border-t">
                            <Button>Change Status</Button>
                            <Button variant="outline">Download</Button>
                            {/* <Button variant="outline">Share Report</Button> */}
                        </div>
                    </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column */}


                    <div className="space-y-8">
                        {/* Item Details */}
                        <Card className="shadow-md border border-gray-200">
                            <CardHeader className="bg-sky-50 rounded-t-lg border-b">
                                <CardTitle className="flex items-center gap-2 text-sky-800 text-lg font-semibold">
                                    <FileText className="h-5 w-5" />
                                    Item Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Item Name</label>
                                    <p className="text-lg font-semibold capitalize text-gray-800">{report.items}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Categories</label>
                                    <div className="flex flex-wrap gap-2">
                                        {report.category.map((cat, index) => (
                                            <Badge key={index} className="bg-sky-100 text-sky-800 border border-sky-200">
                                                {cat}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Description</label>
                                    <p className="text-gray-700 leading-relaxed">{report.description}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reporter Information */}
                        <Card className="shadow-md border border-gray-200">
                            <CardHeader className="bg-green-50 rounded-t-lg border-b">
                                <CardTitle className="flex items-center gap-2 text-green-800 text-lg font-semibold">
                                    <User className="h-5 w-5" />
                                    Reporter Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                                    <p className="text-gray-800 text-lg font-semibold">{report.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <p className="text-gray-700">{report.phoneNo}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">NIC</label>
                                    <p className="text-gray-700">{report.nic}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Report Information */}
                        <Card className="shadow-md border border-gray-200">
                            <CardHeader className="bg-yellow-50 rounded-t-lg border-b">
                                <CardTitle className="flex items-center gap-2 text-yellow-800 text-lg font-semibold">
                                    <Hash className="h-5 w-5" />
                                    Report Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Reference Number</label>
                                    <p className="text-blue-700 font-mono font-bold text-lg">{report.referanceNo}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Report Created</label>
                                    <p className="text-gray-700">{formatDate(report.createdAt)}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Last Updated</label>
                                    <p className="text-gray-700">{formatDate(report.updatedAt)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                    {/* Right Column */}


                    <div className="space-y-8">
                        {/* Item Images */}
                        {report.image?.length > 0 && (
                            <Card className="shadow-md border border-gray-200">
                                <CardHeader className="bg-purple-50 border-b rounded-t-lg">
                                    <CardTitle className="flex items-center gap-2 text-purple-800 text-lg font-semibold">
                                        <Camera className="h-5 w-5" />
                                        Item Images ({report.image.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5 p-6">
                                    {report.image.length === 1 ? (
                                        <div className="relative">
                                            <img
                                                src={report.image[0]}
                                                alt="Lost item"
                                                className="w-full h-64 object-cover rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                                                onClick={() => window.open(report.image[0], "_blank")}
                                            />
                                        </div>
                                    ) : report.image.length === 2 ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {report.image.map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={img}
                                                    alt={`Lost item ${i + 1}`}
                                                    className="h-48 w-full object-cover rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                                                    onClick={() => window.open(img, "_blank")}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* Main Image */}
                                            <div className="relative">
                                                <img
                                                    src={report.image[0]}
                                                    alt="Main lost item"
                                                    className="w-full h-64 object-cover rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                                                    onClick={() => window.open(report.image[0], "_blank")}
                                                />
                                                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                                                    1 of {report.image.length}
                                                </div>
                                            </div>

                                            {/* Remaining Grid */}
                                            <div className="grid grid-cols-3 gap-3">
                                                {report.image.slice(1, 4).map((img, i) => (
                                                    <div key={i + 1} className="relative">
                                                        <img
                                                            src={img}
                                                            alt={`Lost item ${i + 2}`}
                                                            className="w-full h-20 object-cover rounded border hover:shadow-md transition-shadow cursor-pointer"
                                                            onClick={() => window.open(img, "_blank")}
                                                        />
                                                    </div>
                                                ))}

                                                {report.image.length > 4 && (
                                                    <div className="relative">
                                                        <img
                                                            src={report.image[4]}
                                                            alt="View more"
                                                            className="w-full h-20 object-cover rounded border cursor-pointer"
                                                        />
                                                        <div
                                                            className="absolute inset-0 bg-black/60 text-white text-sm font-semibold flex items-center justify-center rounded hover:bg-black/70 transition"
                                                            onClick={() => alert(`View all ${report.image.length} images`)}
                                                        >
                                                            +{report.image.length - 4}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => alert("View image gallery")}
                                            >
                                                View All Images ({report.image.length})
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Location & Time */}
                        <Card className="shadow-md border border-gray-200">
                            <CardHeader className="bg-amber-50 border-b rounded-t-lg">
                                <CardTitle className="flex items-center gap-2 text-yellow-800 text-lg font-semibold">
                                    <MapPin className="h-5 w-5" />
                                    Location & Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">Location</label>
                                        <p className="text-lg font-semibold capitalize text-gray-800">{report.location}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">District</label>
                                        <p className="text-lg font-medium text-gray-800">{report.district}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Nearest Police Station</label>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-gray-500" />
                                        <p className="text-gray-800">{report.nearestPoliceStation}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">Date Lost</label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <p className="text-gray-800">{formatDate(report?.dateOfLost || report?.dateOfFound)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">Time Lost</label>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <p className="text-gray-800">{report?.timeOfLost || report?.timeOfFound}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ReportView
