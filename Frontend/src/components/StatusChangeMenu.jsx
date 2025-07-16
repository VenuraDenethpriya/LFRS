import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateFoundReportMutation, useUpdateLostReportMutation } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

function StatusChangeMenu(props) {
    const { user } = useUser()
    const getStatusBadge = (status) => {
        switch (status) {
            case 'LOST':
                return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">{props.status}</span>;
            case 'FOUND':
                return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{props.status}</span>;
            case 'IMFORMED':
                return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">{props.status}</span>;
            case 'COLLECTED':
                return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{props.status}</span>;
            case 'REMOVED':
                return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{props.status}</span>;
            case 'NOT COLLECTED':
                return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{props.status}</span>;
            default:
                return <span className="bg-white text-black px-3 py-1 rounded-full">{props.status}</span>;
        }
    };
    const [updateLostStatus] = useUpdateLostReportMutation();
    const [updateFoundStatus] = useUpdateFoundReportMutation();

    const handleUpdate = async (newStatus) => {
        try {
            if (props.type === "found") {
                await updateFoundStatus({
                    id: props.id,
                    body: { status: newStatus }
                }).unwrap();
                toast.success("Status updated successfully!");
                window.location.reload();
            } else {
                await updateLostStatus({
                    id: props.id,
                    body: { status: newStatus }
                }).unwrap();
                toast.success("Status updated successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                {getStatusBadge(props.status)}
            </DropdownMenuTrigger>
            {
                user.publicMetadata.role === "admin" ? (<DropdownMenuContent side="right-start">
                    {
                        props.type === "lost" ? (
                            <DropdownMenuItem onClick={() => handleUpdate('FOUND')}>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-36 text-center">FOUND</span>
                            </DropdownMenuItem>
                        ) : null
                    }
                    <DropdownMenuItem onClick={() => handleUpdate('IMFORMED')}>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full w-36 text-center">IMFORMED</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdate('COLLECTED')}>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full w-36 text-center">COLLECTED</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdate('REMOVED')}>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full w-36 text-center">REMOVED</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdate('NOT COLLECTED')}>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full w-36 text-center">NOT COLLECTED</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>) : null
            }

        </DropdownMenu>
    );
}

export default StatusChangeMenu;
