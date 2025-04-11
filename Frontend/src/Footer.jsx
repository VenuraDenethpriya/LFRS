import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
function Footer() {
    return (
        <footer id="footer" className="flex bg-blue-950 text-white px-12 py-6 justify-center">
            <div>
                <div className="flex gap-4 pl-12 pb-4 text-2xl">

                    <a className="hover:text-teal-100" href=""><FaFacebook /></a>
                    <a className="hover:text-teal-100" href=""><IoLogoWhatsapp /></a>
                    <a className="hover:text-teal-100" href=""><IoLogoYoutube /></a>
                    <a className="hover:text-teal-100" href=""><AiFillTikTok/></a>
                    <a className="hover:text-teal-100" href=""><MdEmail/></a>
                </div>
                
                <div className="pl-4">
                    &copy; 2025 LFRS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;