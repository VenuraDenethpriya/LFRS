import { toast } from "react-toastify";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useUpdateFoundReportMutation } from "./lib/api";
import EditFoundForm from "./EditFoundForm";
import { PDFDownloadLink } from '@react-pdf/renderer';
import FoundReportTemplate from './components/FoundReportTemplate';
import { useNavigate } from "react-router";
import { Badge } from "./components/ui/badge";

function FoundCard(props) {
    const navigate = useNavigate();
    const [updateStatus, { isSuccess, isError }] = useUpdateFoundReportMutation()
    //const [id, setId] = useState('')

    const handleUpdate = async (e) => {

        try {
            //setId(props.id)
            const id = props.id;
            console.log(id)
            await updateStatus({
                id, body: { status: "CLAIMED" }
            })
            toast.success("Status updated successfully!");
            window.location.reload();
        } catch (error) {
            toast.error(isError?.message || "Status updated successfully!");
        }
    }

    const reportData = {
        referanceNo: props.referanceNo,
        item: props.item,
        name: props.name,
        date: props.date,
        phoneNo: props.phoneNo,
        location: props.location,
        station: props.station,
        status: props.status
    };



    return (
        <div>
            <Card className="mb-4">
                <CardContent className="p-4 cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-center  gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{props.referanceNo}</h3>

                        <div className="flex flex-wrap gap-2">
                            {props.category.map((cat, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium shadow-sm"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-3 grid-cols-1">
                        <div onClick={() => navigate(`/reports/${props.id}/found`)}>
                            <p>
                                <span className="font-medium">Reported by: </span>{props.name}
                            </p>
                            <p>
                                <span className="font-medium">Found Date: </span> {props.date}
                            </p>
                            <p>
                                <span className="font-medium">Phone No: </span> {props.phoneNo}
                            </p>
                            <p>
                                <span className="font-medium">Items: </span> {props.item}
                            </p>
                        </div>
                        <div onClick={() => navigate(`/reports/${props.id}/found`)}>
                            <p>
                                <span className="font-medium">Nearest Police: </span> {props.station}
                            </p>
                            <p>
                                <span className="font-medium">Updated At: </span> {props.updatedAt}
                            </p>
                            <p>
                                <span className="font-medium">Location: </span> {props.location}
                            </p>
                            {
                                props.status == 'FOUND' ? (
                                    <p className="bg-green-200 w-fit rounded-full px-2">
                                        <span className="font-bold">Status:</span> {props.status}
                                    </p>
                                ) : props.status == 'CLAIMED' ? (<p className="bg-cyan-400 w-fit rounded-full px-2">
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
                        <div>
                            <div>
                                <div>
                                    <img onClick={() => navigate(`/reports/${props.id}/lost`)} src={props.image} alt="Lost Item" className="w-32 h-32 object-cover rounded-lg" />
                                </div>
                                <div className="flex flex-row gap-x-4">
                                    {props.status === 'CLAIMED' ? null : (
                                        <div className="flex items-center gap-2">
                                            <div className="mt-2">
                                                <EditFoundForm
                                                    item={props.item}
                                                    id={props.id}
                                                    name={props.name}
                                                    date={props.date}
                                                    phoneNo={props.phoneNo}
                                                    location={props.location}
                                                    station={props.station}
                                                />
                                            </div>

                                            <Button
                                                className="mt-2 w-fit bg-white text-blue-950 border-2 border-blue-950  hover:text-white"
                                                onClick={handleUpdate}
                                            >
                                                Claimed
                                            </Button>
                                            <PDFDownloadLink
                                                document={<FoundReportTemplate data={reportData} />}
                                                fileName={`Found-Report-${props.referanceNo}.pdf`}
                                            >
                                                {({ blob, url, loading, error }) => (
                                                    <Button
                                                        className=" mt-2"
                                                        variant="outline"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Generating...' : 'Save Report'}
                                                    </Button>
                                                )}
                                            </PDFDownloadLink>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default FoundCard;