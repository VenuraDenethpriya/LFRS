import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./components/ui/input";
import { useNavigate } from "react-router";
import { useUpdateFoundReportMutation } from "./lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function EditFoundForm(props) {

    const [updateFoundReport, { isSuccess, isError, error }] = useUpdateFoundReportMutation()
    const navigate = useNavigate()

    const [id, setId] = useState('')
    const [items, setItems] = useState(props.item)
    const [name, setName] = useState(props.name)
    const [date, setDate] = useState(props.date)
    const [phoneNo, setPhoneNo] = useState(props.phoneNo)
    const [location, setLocation] = useState(props.location)
    const [station, setStation] = useState(props.station)

    const handleItesChange = (e) => setItems(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)
    const handleDateChange = (e) => setDate(e.target.value)
    const handlePhoneNoChange = (e) => setPhoneNo(e.target.value)
    const handleLocationChange = (e) => setLocation(e.target.value)
    const handleStationChange = (e) => setStation(e.target.value)

    useEffect(() => {
        if (isSuccess) {
            setItems('')
            setName('')
            setDate('')
            setPhoneNo('')
            setLocation('')
            setStation('')   
            navigate('/reports')
            window.location.reload();
            toast.success("Success have been successfully updated ")
        }
    }, [isSuccess, navigate, id])

    useEffect(() => {
        if (isError) {
            toast.error(error?.message || "Failed to update the report, please try again")
        }
    })
    const handleSaveClick = async (e) => {
        e.preventDefault(); 
    
        if (!id) {
            toast.error("Error: Report ID is missing!");
            return;
        }
    
        try {
            await updateFoundReport({
                id,
                body: { items, name, date, location, phoneNo, station }
            });
        } catch (error) {
            console.error("Update failed:", error);
        }
    };
    return ( 
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-fit" onClick={() => setId(props.id)}>Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Found Report</DialogTitle>
                        <DialogDescription>
                            Make changes to your found report. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="items" className="text-right">
                                Items
                            </Label>
                            <Input
                                id="items"
                                defaultValue={props.item}
                                className="col-span-3"
                                value={items}
                                onChange={handleItesChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue={props.name}
                                className="col-span-3"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                defaultValue={props.date}
                                className="col-span-3"
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNo" className="text-right">
                                Phone No
                            </Label>
                            <Input
                                id="phoneNo"
                                defaultValue={props.phoneNo}
                                className="col-span-3"
                                value={phoneNo}
                                onChange={handlePhoneNoChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="location"
                                defaultValue={props.location}
                                className="col-span-3"
                                value={location}
                                onChange={handleLocationChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="station" className="text-right">
                                Police Station
                            </Label>
                            <Input
                                id="station"
                                defaultValue={station}
                                className="col-span-3"
                                value={props.station}
                                onChange={handleStationChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button 
                        type="submit"
                        onClick={handleSaveClick}
                        >Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
     );
}

export default EditFoundForm;