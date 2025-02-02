import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import EditLostForm from "./EditLostForm";
import { useUpdateLostReportMutation } from "./lib/api";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LostReportTemplate from "./components/LostReportTemplate";

function LostCard(props) {

    const [updateStatus, { isSuccess, isError }] = useUpdateLostReportMutation()
    //const [id, setId] = useState('')

    const handleUpdate = async (e) => {

        try {
            //setId(props.id)
            const id = props.id;
            console.log(id)
            await updateStatus({
                id, body: { status: "FOUND" }
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
                    <div className="sm:grid sm:grid-cols-2 grid-cols-1">
                        <div>
                            <p>
                                <span className="font-medium">Reported by:</span>{props.name}
                            </p>
                            <p>
                                <span className="font-medium">Lost Date:</span> {props.date}
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
                                props.status == 'FOUND' ? (
                                    <p className="bg-green-200 w-fit rounded-full px-2">
                                        <span className="font-bold">Status:</span> {props.status}
                                    </p>
                                ) : props.status == 'LOST' ? (<p className="bg-red-400 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p>
                                ) : props.status == 'IMFORMED' ? (<p className="bg-amber-200 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p>
                                ) : props.status == 'COLLECTED' ? (<p className="bg-blue-300 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p>
                                ) : props.status == 'REMOVED' ? (<p className="bg-rose-50 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p>
                                ) : props.status == 'NOT COLLECTED' ? (<p className="bg-red-300 w-fit rounded-full px-2">
                                    <span className="font-bold">Status:</span> {props.status}
                                </p>
                                ) : null
                            }
                        </div>
                        
                    </div>
                    <div className="flex sm:flex gap-2 sm:justify-end justify-left">
                            {
                                props.status === 'FOUND' ? <div></div> : <div className="mt-2"><EditLostForm
                                    item={props.item}
                                    id={props.id}
                                    name={props.name}
                                    date={props.date}
                                    phoneNo={props.phoneNo}
                                    location={props.location}
                                    station={props.station}
                                /></div>
                            }


                            {
                                props.status === 'FOUND' ? <div></div> : <Button className="mt-2 w-fit bg-white text-blue-950 border-2 border-blue-950  hover:text-white" onClick={handleUpdate}>
                                    Found
                                </Button>
                            }

                            {
                                props.status === 'FOUND' ? <div></div> :
                                    <PDFDownloadLink
                                        document={<LostReportTemplate data={props} />}
                                        fileName={`Lost-Report-${props.referanceNo}.pdf`}
                                    >
                                        {({ blob, url, loading, error }) => (
                                            <Button
                                                className="mt-2 w-fit"
                                                variant="outline"
                                                disabled={loading}
                                            >
                                                {loading ? 'Generating PDF...' : 'Save Report'}
                                            </Button>
                                        )}
                                    </PDFDownloadLink>
                            }

                        </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LostCard;