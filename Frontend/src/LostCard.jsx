import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import EditLostForm from "./EditLostForm";
import { useUpdateLostReportMutation } from "./lib/api";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import StatusChangeMenu from "./components/StatusChangeMenu";
import ReportTemplate from "./components/ReportTemplate";

function LostCard(props) {

    const { user } = useUser()
    const navigate = useNavigate()
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

        { props.item }
    }
    const isEditable = () => {
    const createdAt = new Date(props.createdAt);
    const now = new Date();
    const diffInMs = now - createdAt;
    return diffInMs <= 60 * 60 * 1000; // 1 hour
};
    return (
        <div>
            <Card className="mb-4 cursor-pointer">
                <CardContent className="p-4 cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-center  gap-10 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800" onClick={
                            user.publicMetadata.role === "admin"
                                ? () => navigate(`/reports/${props.id}/lost`)
                                : undefined
                        }>{props.referanceNo}</h3>

                        <StatusChangeMenu
                            status={props.status}
                            id={props.id}
                            type="lost"
                        />
                    </div>


                    <div
                        className="sm:grid sm:grid-cols-3 grid-cols-1"
                    >
                        <div
                            onClick={
                                user.publicMetadata.role === "admin"
                                    ? () => navigate(`/reports/${props.id}/lost`)
                                    : undefined
                            }
                        >

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
                                <span className="font-medium">Items:</span> {props.item}
                            </p>
                        </div>
                        <div>
                            <div
                                onClick={
                                    user.publicMetadata.role === "admin"
                                        ? () => navigate(`/reports/${props.id}/lost`)
                                        : undefined
                                }
                            >
                                <p>
                                    <span className="font-medium">Nearest Police:</span> {props.station}
                                </p>
                                <p>
                                    <span className="font-medium">Updated At:</span> {props.updatedAt}
                                </p>
                                <p>
                                    <span className="font-medium">Location:</span> {props.location}
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

                        {
                            user?.publicMetadata?.role === "admin" ? (
                                <div>
                                    <img onClick={
                                        user.publicMetadata.role === "admin"
                                            ? () => navigate(`/reports/${props.id}/lost`)
                                            : undefined
                                    } src={props.image} alt="Lost Item" className="w-32 h-32 object-cover rounded-lg" />
                                </div>
                            ) : (
                                <div className="">
                                    <div>
                                        <div>
                                            {props.image ? (
                                                <img
                                                    onClick={
                                                        user.publicMetadata.role === "admin"
                                                            ? () => navigate(`/reports/${props.id}/lost`)
                                                            : undefined
                                                    }
                                                    src={props.image}
                                                    alt="Lost Item"
                                                    className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                                                />
                                            ) : <div></div>}
                                        </div>

                                        <div className="flex flex-row gap-x-4">
                                            {
                                                props.status !== 'FOUND' && (
                                                    <div className="flex items-center gap-2">
                                                        {isEditable() ? (
                                                            <div className="mt-2">
                                                                <EditLostForm
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
                                                                onClick={() =>
                                                                    toast.error("Editing is only allowed within 1 hour of report creation.")
                                                                }
                                                            >
                                                                Edit
                                                            </Button>
                                                        )}
                                                    </div>
                                                )
                                            }



                                            {
                                                props.status === 'FOUND' ? <div></div> : <Button className="mt-2 w-fit bg-white text-blue-950 border-2 border-blue-950  hover:text-white" onClick={handleUpdate}>
                                                    Found
                                                </Button>
                                            }

                                            {
                                                props.status === 'FOUND' ? <div></div> :
                                                    <PDFDownloadLink
                                                        document={<ReportTemplate data={props} />}
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
                                    </div>

                                </div>
                            )
                        }

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LostCard;