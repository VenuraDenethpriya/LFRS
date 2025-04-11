import Footer from "@/Footer";
import Navigation from "@/Navigation";
import { Outlet } from "react-router";

function RootLayout() {
    return ( 
        <>
            <Navigation/>
            <Outlet/>
            <Footer/>
        </>
     );
}

export default RootLayout;