import { Link } from "react-router";
import { Button } from "./components/ui/button";

function Hero() {
    return (
        <section className="relative min-h-[700px] flex justify-center items-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('../src/assets/Hero/hero.webp')] bg-cover bg-center brightness-75 scale-105"></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/70 to-black/60 backdrop-blur-sm"></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center flex flex-col justify-center items-center px-6 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                    Find & Recover Items <span className="text-red-400">Easily</span>
                </h1>
                <p className="text-md sm:text-lg md:text-xl mt-6 text-gray-200 font-medium">
                    Report lost items securely with the official Lost and Found Reporting System. Track, verify,
                    and get real-time updates to help recover your belongings faster.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mt-10">
                    <Link to="/lostreport">
                        <Button
                            variant="outline"
                            className="bg-red-500/90 text-white border-none hover:bg-red-600 hover:scale-105 transition-all duration-200 px-6 py-3 text-lg font-semibold shadow-xl rounded-xl"
                        >
                            Report Lost Item
                        </Button>
                    </Link>

                    <Link to="/foundreport">
                        <Button
                            variant="outline"
                            className="bg-lime-500/90 text-white border-none hover:bg-lime-600 hover:scale-105 transition-all duration-200 px-6 py-3 text-lg font-semibold shadow-xl rounded-xl"
                        >
                            Report Found Item
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
