import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

function FoundCard(props) {
    return (
        <div>
            <Card className="mb-4">
                <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{props.item}</h3>
                    <p>
                        <span className="font-medium">Reported by:</span> {props.name}
                    </p>
                    <p>
                        <span className="font-medium">Date:</span> {props.date}
                    </p>
                    <p>
                        <span className="font-medium">Location:</span> {props.location}
                    </p>
                    <p>
                        <span className="font-medium">Nearest Police:</span> {props.station}
                    </p>
                    <p>
                        <span className="font-medium">Status:</span> {props.status}
                    </p>
                    <p>
                        <span className="font-medium">Status:</span> {props.update}
                    </p>
                    <Button className="mt-2" variant="outline">
                        Handover
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default FoundCard;