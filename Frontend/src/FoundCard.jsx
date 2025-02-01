import { toast } from "react-toastify";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useUpdateFoundReportMutation } from "./lib/api";
import EditFoundForm from "./EditFondForm";

function FoundCard(props) {
    const [updateStatus, { isSuccess, isError }] = useUpdateFoundReportMutation()
    //const [id, setId] = useState('')

    const handleUpdate = async (e) => {

        try {
            //setId(props.id)
            const id = props.id;
            console.log(id)
            await updateStatus({
                id, body: { status: "HANDOVER" }
            })
            toast.success("Status updated successfully!");
            window.location.reload();
        } catch (error) {
            toast.error(isError?.message || "Status updated successfully!");
        }
    }
    return (
        <div>
            <Card className="mb-4">
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{props.item}</h3>
                    <div className="grid grid-cols-3">
                        <div>
                            <p>
                                <span className="font-medium">Reported by:</span>{props.name}
                            </p>
                            <p>
                                <span className="font-medium">Date:</span> {props.date}
                            </p>
                            <p>
                                <span className="font-medium">Phone No:</span> {props.phoneNo}
                            </p>
                            <p>
                                <span className="font-medium">Location:</span> {props.location}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-medium">Nearest Police:</span> {props.station}
                            </p>
                            <p>
                                <span className="font-medium">Updated At:</span> {props.updatedAt}
                            </p>
                            <p>
                                <span className="font-medium">ReferonceNo:</span> {props.referanceNo}
                            </p>
                            {
                                props.status == 'FOUND' ? <p className="bg-green-200 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p> : <p className="bg-blue-300 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p>
                            }
                        </div>
                        <div className="flex flex-col">
                            {
                                props.status === 'HANDOVER' ? <div></div> : <EditFoundForm
                                    item={props.item}
                                    id={props.id}
                                    name={props.name}
                                    date={props.date}
                                    phoneNo={props.phoneNo}
                                    location={props.location}
                                    station={props.station}
                                />
                            }


                            {
                                props.status === 'HANDOVER' ? <div></div> : <Button className="mt-2 w-fit" onClick={handleUpdate}>
                                    Handover
                                </Button>
                            }

                            {
                                props.status === 'HANDOVER' ? <div></div> : <Button className="mt-2  w-fit" variant="outline">
                                    Save Report
                                </Button>
                            }

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default FoundCard;