import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LostCard from "@/LostCard"
import FoundCard from "@/FoundCard"
import { useEffect, useMemo, useState } from "react"
import { useGetCategoriesQuery, useGetFoundReportsQuery, useGetLostReportsQuery } from "@/lib/api"
import LoadCard from "@/LoadCard"
import { ToastContainer, toast } from 'react-toastify';
import { useAuth, useUser } from "@clerk/clerk-react"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import { PaginationComponent } from "@/components/Pagination"
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from "@/components/ui/button"

export default function ItemReports() {

    const { user, isLoaded } = useUser()

    const [referance, setReferance] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [policeStation, setPoliceStation] = useState('')
    const [district, setDistrict] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('')
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)


    useEffect(() => {
        referance ? setReferance(referance) : setReferance('')
        category ? setCategory(category) : setCategory('')
        location ? setLocation(location) : setLocation('')
        policeStation ? setPoliceStation(policeStation) : setPoliceStation('')
        district ? setDistrict(district) : setDistrict('')
        date ? setDate(date) : setDate('')
        status ? setStatus(status) : setStatus('')
    }, [referance, category, location, policeStation, district, date, status])

    const navigate = useNavigate()
    const { isSignedIn } = useAuth()

    const filters = {
        referance,
        category,
        location,
        policeStation,
        district,
        date,
        status,
        limit,
        offset,
    };
    console.log(filters)

    const { data: lostReports, isLoading: isLostLoading, isError: isLostError, error: lostError } = useGetLostReportsQuery(filters)
    const { data: foundReports, isLoading: isFoundLoading, isError: isFoundError, error: foundError } = useGetFoundReportsQuery(filters)
    const { data: categoriesList } = useGetCategoriesQuery();


    const [searchTerm, setSearchTerm] = useState('');
    const filteredCategories = categoriesList?.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const policeStations = [
        { id: 1, name: "Colombo Central" },
        { id: 2, name: "Colombo North" },
        { id: 3, name: "Colombo South" },
        { id: 4, name: "Borella" },
        { id: 5, name: "Nugegoda" },
        { id: 6, name: "Mount Lavinia" },
        { id: 7, name: "Wellawatte" },
        { id: 8, name: "Kirulapone" },
        { id: 9, name: "Kandy" },
        { id: 10, name: "Peradeniya" },
        { id: 11, name: "Katugastota" },
        { id: 12, name: "Galle" },
        { id: 13, name: "Hikkaduwa" },
        { id: 14, name: "Ambalangoda" },
        { id: 15, name: "Matara" },
        { id: 16, name: "Tangalle" },
        { id: 17, name: "Negombo" },
        { id: 18, name: "Gampaha" },
        { id: 19, name: "Wattala" },
        { id: 20, name: "Kurunegala" },
        { id: 21, name: "Anuradhapura" },
        { id: 22, name: "Polonnaruwa" },
        { id: 23, name: "Trincomalee" },
        { id: 24, name: "Jaffna" },
        { id: 25, name: "Vavuniya" },
        { id: 26, name: "Batticaloa" },
        { id: 27, name: "Ampara" }
    ];

    const [searchTermPoliceStation, setSearchTermPoliceStation] = useState('');
    const filteredPoliceStations = policeStations.filter((policeStation) =>
        policeStation.name.toLowerCase().includes(searchTermPoliceStation.toLowerCase())
    );

    const districts = [
        { id: 1, name: "Ampara" },
        { id: 2, name: "Anuradhapura" },
        { id: 3, name: "Badulla" },
        { id: 4, name: "Batticaloa" },
        { id: 5, name: "Colombo" },
        { id: 6, name: "Galle" },
        { id: 7, name: "Gampaha" },
        { id: 8, name: "Hambantota" },
        { id: 9, name: "Jaffna" },
        { id: 10, name: "Kalutara" },
        { id: 11, name: "Kandy" },
        { id: 12, name: "Kegalle" },
        { id: 13, name: "Kilinochchi" },
        { id: 14, name: "Kurunegala" },
        { id: 15, name: "Mannar" },
        { id: 16, name: "Matale" },
        { id: 17, name: "Matara" },
        { id: 18, name: "Monaragala" },
        { id: 19, name: "Mullaitivu" },
        { id: 20, name: "Nuwara Eliya" },
        { id: 21, name: "Polonnaruwa" },
        { id: 22, name: "Puttalam" },
        { id: 23, name: "Ratnapura" },
        { id: 24, name: "Trincomalee" },
        { id: 25, name: "Vavuniya" }
    ];



    // useEffect(() => {
    //     if (isLostError) {
    //         toast.error(lostError?.message || "An error occurred while fetching lost reports.", {
    //             className: "messagePosition"
    //         });
    //     }
    //     if (isFoundError) {
    //         toast.error(foundError?.message || "An error occurred while fetching found reports.", {
    //             className: "messagePosition"
    //         });
    //     }
    // }, [isLostError, isFoundError, lostError, foundError, isLoaded]);

    useEffect(() => {
        if (user) {
            console.log("User object is available.");
        } else {
            console.log("User object is not yet available.");
        }
    }, [user, isLoaded]);

    // Function to clear all filter inputs
    const handleClearFilters = () => {
        setReferance('');
        setCategory('');
        setLocation('');
        setPoliceStation('');
        setDistrict('');
        setDate('');
        setStatus('');
        setSearchTermPoliceStation('');
        setSearchTerm('');
    };

    if (!isLoaded) {
        return (
            <section className="bg-slate-50 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold text-blue-950 mb-6">Lost and Found Items Reports</h1>
                    <p className="text-center text-gray-600">Loading user data...</p>
                </div>
            </section>
        )
    }

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


    if (isLostError || isFoundError) {
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
                                    <LoadCard />
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="found">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Found Items Reports</CardTitle>
                                </CardHeader>
                                <LoadCard />
                                <CardContent>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        )
    }

    if (!isSignedIn) {
        return (
            <section className="bg-slate-50 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold text-blue-950 mb-6">Lost and Found Items Reports</h1>
                    <p className="text-center text-gray-600">Please sign in to view reports.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-slate-50 pt-8 min-h-screen px-10">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-950 mb-6">Lost and Found Items Reports</h1>

                <Tabs defaultValue="lost" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="lost">Lost Items</TabsTrigger>
                        <TabsTrigger value="found">Found Items</TabsTrigger>
                    </TabsList>

                    {
                        user?.publicMetadata?.role === "admin" ? (<div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <Label htmlFor="filter-reports-label" className="text-sm font-medium text-gray-700">Filter Reports</Label>
                                <Button
                                    type="button"
                                    onClick={handleClearFilters}
                                    variant="outline"
                                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                                {/* Reference No. Input */}
                                <Input
                                    type="text"
                                    placeholder="Reference No."
                                    onChange={(e) => setReferance(e.target.value)}
                                    value={referance}
                                />

                                {/* Category Select */}
                                <Select onValueChange={setCategory} value={category}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" /> {/* Updated placeholder text */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        <Input
                                            placeholder="Search category"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {filteredCategories.map((category) => (
                                            <SelectItem key={category._id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Location Input */}
                                <Input
                                    type="text"
                                    placeholder="Location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                />

                                {/* Police Station Select */}
                                <Select onValueChange={setPoliceStation} value={policeStation}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Police Station" /> {/* Updated placeholder text */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* REMOVED: <SelectItem value="">Police Station</SelectItem> */}
                                        <Input placeholder="Search police station" onChange={(e) => setSearchTermPoliceStation(e.target.value)} />
                                        {filteredPoliceStations.map((policeStation) => (
                                            <SelectItem key={policeStation.id} value={policeStation.name}>
                                                {policeStation.name}
                                            </SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>

                                {/* District Select */}
                                <Select onValueChange={setDistrict} value={district}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select District" /> {/* Updated placeholder text */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            districts.map((district) => (
                                                <SelectItem key={district.id} value={district.name}>
                                                    {district.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>

                                {/* Date Input */}
                                <Input
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                />

                                {/* Status Select */}
                                <Select onValueChange={setStatus} value={status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" /> {/* Updated placeholder text */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* REMOVED: <SelectItem value="">Status</SelectItem> */}
                                        <SelectItem value="LOST">LOST</SelectItem>
                                        <SelectItem value="FOUND">FOUND</SelectItem>
                                        <SelectItem value="IMFORMED">IMFORMED</SelectItem>
                                        <SelectItem value="COLLECTED">COLLECTED</SelectItem>
                                        <SelectItem value="REMOVED">REMOVED</SelectItem>
                                        <SelectItem value="NOT COLLECTED">NOT COLLECTED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>) : null
                    }


                    <TabsContent value="lost">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">
                                    Lost Items Reports
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    Total Reports Found: {lostReports?.totalCount}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {lostReports?.data.length === 0 && (
                                    <p className="text-center text-gray-600">No lost item report found.</p>
                                )}

                                {lostReports?.data.map(report => (
                                    <LostCard
                                        key={report._id}
                                        id={report._id}
                                        item={report.items}
                                        name={report.name}
                                        category={report.category}
                                        image={report.image[0]}
                                        date={new Date(report.dateOfLost).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        location={report.location}
                                        station={report.nearestPoliceStation}
                                        updatedAt={new Date(report.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        status={report.status}
                                        referanceNo={report.referanceNo}
                                        phoneNo={report.phoneNo}
                                        type="lost"
                                        createdAt={report.createdAt}
                                        district={report.district}
                                    />
                                ))}
                                <div className="w-full flex justify-end mt-6">
                                    <div className="inline-block">
                                        <PaginationComponent
                                            total={lostReports?.totalCount}
                                            limit={limit}
                                            offset={offset}
                                            setOffset={setOffset}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                        </Card>
                    </TabsContent>
                    <TabsContent value="found">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">
                                    Found Items Reports
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    Total Reports Found: {foundReports?.totalCount}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {foundReports?.data.length === 0 && (
                                    <p className="text-center text-gray-600">No found item report found.</p>
                                )}

                                {foundReports?.data.map(report => (
                                    <FoundCard
                                        key={report._id}
                                        id={report._id}
                                        item={report.items}
                                        name={report.name}
                                        image={report.image[0]}
                                        category={report.category}
                                        date={new Date(report.dateOfFound).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        location={report.location}
                                        station={report.nearestPoliceStation}
                                        createdAt={new Date(report.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        updatedAt={new Date(report.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        status={report.status}
                                        referanceNo={report.referanceNo}
                                        phoneNo={report.phoneNo}
                                        district={report.district}
                                        type="found"
                                    />
                                ))}

                                <div className="w-full flex justify-end mt-6">
                                    <div className="inline-block">
                                        <PaginationComponent
                                            total={foundReports?.totalCount}
                                            limit={limit}
                                            offset={offset}
                                            setOffset={setOffset}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </section>

    )
}


