import { toast } from "react-toastify";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useUpdateFoundReportMutation } from "./lib/api";
import EditFoundForm from "./EditFoundForm";
import { PDFDownloadLink } from '@react-pdf/renderer';
import FoundReportTemplate from './components/ReportTemplate';
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import StatusChangeMenu from "./components/StatusChangeMenu";
import ReportTemplate from "./components/ReportTemplate";

function FoundCard(props) {
    const { user } = useUser()
    const navigate = useNavigate();
    const [updateStatus, { isSuccess, isError }] = useUpdateFoundReportMutation()
    //const [id, setId] = useState('')

    const handleUpdate = async (e) => {

        try {
            //setId(props.id)
            const id = props.id;
            console.log(id)
            await updateStatus({
                id, body: { status: "IMFORMED" }
            }).unwrap()
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
        district: props.district,
        location: props.location,
        station: props.station,
        status: props.status,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        image: props.image,
        category: props.category,
        type: props.type,
    };



    return (
        <div>
            <Card className="mb-4">
                <CardContent className="p-4 cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-center  gap-10 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800" onClick={
                            user.publicMetadata.role === "admin"
                                ? () => navigate(`/reports/${props.id}/found`)
                                : undefined
                        }>{props.referanceNo}</h3>
                        <StatusChangeMenu
                            status={props.status}
                            id={props.id}
                            type="found"
                        />

                    </div>

                    <div className="grid sm:grid-cols-3 grid-cols-1">
                        <div onClick={
                            user.publicMetadata.role === "admin"
                                ? () => navigate(`/reports/${props.id}/found`)
                                : undefined
                        }>
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
                        <div>
                            <div onClick={
                                user.publicMetadata.role === "admin"
                                    ? () => navigate(`/reports/${props.id}/found`)
                                    : undefined
                            }>
                                <p>
                                    <span className="font-medium">Nearest Police: </span> {props.station}
                                </p>
                                <p>
                                    <span className="font-medium">Updated At: </span> {props.updatedAt}
                                </p>
                                <p>
                                    <span className="font-medium">Location: </span> {props.location}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {props.category.map((cat, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium shadow-sm" // Changed to orange
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <img onClick={
                                        user.publicMetadata.role === "admin"
                                            ? () => navigate(`/reports/${props.id}/found`)
                                            : undefined
                                    } src={props.image} alt="Lost Item" className="w-32 h-32 object-cover rounded-lg" />
                                </div>
                                {
                                    user?.publicMetadata?.role === "admin" ? null : (
                                        <div className="flex flex-row gap-x-4">
                                            {props.status === 'IMFORMED' ? null : (
                                                <div className="flex items-center gap-2">
                                                    {
                                                        Date.now() - new Date(props.createdAt).getTime() <= 60 * 60 * 1000 ? (
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
                                                        ) : (
                                                            <Button
                                                                className="mt-2"
                                                                variant="outline"
                                                                onClick={() => toast.error("Editing is only allowed within 1 hour of report creation.")}
                                                            >
                                                                Edit
                                                            </Button>

                                                        )
                                                    }


                                                    <Button
                                                        className="mt-2 w-fit bg-white text-blue-950 border-2 border-blue-950  hover:text-white"
                                                        onClick={handleUpdate}
                                                    >
                                                        Imformed
                                                    </Button>
                                                    <PDFDownloadLink
                                                        document={<ReportTemplate data={reportData} />}
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
                                    )
                                }

                            </div>

                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default FoundCard;