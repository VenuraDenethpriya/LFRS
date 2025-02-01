import { Link } from "react-router";
import { Button } from "./components/ui/button";

function Hero() {
    return (
        <section className="relative min-h-[600px] flex justify-center items-center">
            <div className="absolute inset-0 bg-[url('../src/assets/Hero/hero.webp')] bg-cover bg-center opacity-100"></div>
            <div className="absolute inset-0 bg-blue-950 bg-opacity-50 backdrop-blur-md"></div>

            <div className="relative text-white text-center flex flex-col justify-center items-center px-6 max-w-2xl">
                <h1 className="text-2xl  sm:text-6xl font-bold pb-6">
                    Find And Recover Items Easily
                </h1>
                <p className="text-sm pt-4 sm:text-lg font-bold">
                Report lost items quickly and securely with our official Lost and Found Reporting System. 
                Help us streamline the process by submitting detailed reports online, allowing us to track, 
                verify, and assist in recovering your belongings efficiently. Stay informed with real-time updates 
                as we work to reunite you with what’s lost.
                </p>
                <div className="flex justify-center gap-4 py-8">
                    <Link to="/lostreport">
                    <Button variant="outline" className="border-2 text-red-700 border-red-600 bg-red-300 shadow-sm hover:bg-red-600 hover:text-white">
                        Lost Report
                    </Button>
                    </Link>
                    
                    <Link to="/foundreport">
                    <Button variant="outline" className="border-2 text-lime-700 border-lime-700 bg-lime-200 shadow-sm hover:bg-lime-500 hover:text-white">
                        Found Report
                    </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
