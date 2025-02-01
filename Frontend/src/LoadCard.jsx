import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";

function LoadCard() {
    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                    <Skeleton className="h-6 w-3/4" />
                </h3>
                <p>
                    <Skeleton className="h-4 w-2/4" />
                </p>
                <p className="pt-2">
                    <Skeleton className="h-4 w-1/4" />
                </p>
                
            </CardContent>
        </Card>
    );
}

export default LoadCard;
