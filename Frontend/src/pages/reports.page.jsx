import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LostCard from "@/LostCard"
import FoundCard from "@/FoundCard"
import { useEffect, useState } from "react"
import { getFoundReports, getLostReports } from "@/lib/api"
import LoadCard from "@/LoadCard"
import { ToastContainer, toast } from 'react-toastify';

export default function ItemReports() {
    const [lostReports, setLostReports] = useState([])
    const [foundReports, setFoundReports] = useState([])

    const [isLostLoading, setLostLoading] = useState(true)
    const [isFoundLoading, setFoundLoading] = useState(true)

    const [lostError, setLostError] = useState({ isLostError: false, message: '' })
    const [foundError, setFoundError] = useState({ isFoundError: false, message: '' })


    useEffect(() => {
        getLostReports()
            .then((data) => {
                setLostReports(data);
            })
            .catch((error) => {
                setLostError({ isLostError: true, message: error.message })
            })
            .finally(() => setLostLoading(false))
    }, []);

    useEffect(() => {
        getFoundReports()
            .then((data) => {
                setFoundReports(data);
            })
            .catch((error) => {
                setFoundError({ isFoundError: true, message: error.message })
            }).finally(() => setFoundLoading(false))
    }, []);

    useEffect(() => {
        if (lostError.isLostError || foundError.isFoundError) {
            toast.error(lostError.message || foundError.message, {
                className:"messagePosition"
            })
        }
    })

    if (isLostLoading || isFoundLoading) {
        return (
            <section className="bg-slate-50 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold text-blue-950 mb-6">Lost and Found Items Reports</h1>

                    <Tabs defaultValue="lost" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="lost">Lost Items</TabsTrigger>
                            <TabsTrigger value="found">Found Items</TabsTrigger>
                        </TabsList>
                        <TabsContent value="lost">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lost Items Reports</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {
                                        Array(4)
                                            .fill(1)
                                            .map((_, i) => {
                                                return (
                                                    <LoadCard
                                                        key={i}
                                                    />
                                                )
                                            })
                                    }
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="found">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Found Items Reports</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {
                                        Array(4)
                                            .fill(1)
                                            .map((_, i) => {
                                                return (
                                                    <LoadCard
                                                        key={i}
                                                    />
                                                )
                                            })
                                    }
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        )
    }


    if (lostError.isLostError || foundError.isFoundError) {
        return (
            <section className="bg-slate-50 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold text-blue-950 mb-6">Lost and Found Items Reports</h1>

                    <Tabs defaultValue="lost" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="lost">Lost Items</TabsTrigger>
                            <TabsTrigger value="found">Found Items</TabsTrigger>
                        </TabsList>
                        <TabsContent value="lost">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lost Items Reports</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <LoadCard/>
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="found">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Found Items Reports</CardTitle>
                                </CardHeader>
                                <LoadCard/>
                                <CardContent>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-slate-50 min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-950 mb-6">Lost and Found Items Reports</h1>

                <Tabs defaultValue="lost" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="lost">Lost Items</TabsTrigger>
                        <TabsTrigger value="found">Found Items</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lost">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lost Items Reports</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {lostReports.length === 0 && (
                                    <p className="text-center text-gray-600">No lost item report found.</p>
                                )}

                                {lostReports.map(report => (
                                    <LostCard
                                        key={report._id}
                                        item={report.items}
                                        name={report.name}
                                        date={report.dateOfLost}
                                        location={report.location}
                                        station={report.nearestPoliceStation}
                                        update={report.updatedAt}
                                        status={report.status}
                                        type="lost"
                                    />
                                ))}
                            </CardContent>

                        </Card>
                    </TabsContent>
                    <TabsContent value="found">
                        <Card>
                            <CardHeader>
                                <CardTitle>Found Items Reports</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {foundReports.length === 0 && (
                                    <p className="text-center text-gray-600">No lost item report found.</p>
                                )}

                                {foundReports.map(report => (
                                    <FoundCard
                                        key={report._id}
                                        item={report.items}
                                        name={report.name}
                                        date={report.dateOfLost}
                                        location={report.location}
                                        station={report.nearestPoliceStation}
                                        update={report.updatedAt}
                                        status={report.status}
                                        type="found"
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>

    )
}


