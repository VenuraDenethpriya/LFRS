import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp, IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer id="footer" className="px-6 py-12 text-white bg-gradient-to-tr from-blue-900 via-blue-950 to-black">
      <div className="grid grid-cols-1 gap-10 p-8 mx-auto border shadow-xl max-w-7xl md:grid-cols-3 bg-white/5 backdrop-blur-md rounded-2xl border-white/10">

        {/* Social Media */}
        <div>
          <h3 className="mb-4 text-2xl font-bold text-teal-300">Follow Us</h3>
          <div className="flex gap-5 text-3xl">
            <a href="#" className="text-blue-400 transition-transform hover:scale-125"><FaFacebook /></a>
            <a href="#" className="text-green-400 transition-transform hover:scale-125"><IoLogoWhatsapp /></a>
            <a href="#" className="text-red-400 transition-transform hover:scale-125"><IoLogoYoutube /></a>
            <a href="#" className="text-pink-400 transition-transform hover:scale-125"><AiFillTikTok /></a>
            <a href="mailto:ifrs@gmail.com" className="text-yellow-400 transition-transform hover:scale-125"><MdEmail /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-2xl font-bold text-teal-300">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li><a href="#hero" className="transition hover:text-white hover:underline">Home</a></li>
            <li><a href="#aboutUs" className="transition hover:text-white hover:underline">About Us</a></li>
            <li><a href="#faq" className="transition hover:text-white hover:underline">FAQs</a></li>
            <li><a href="#howItWorks" className="transition hover:text-white hover:underline">How it Works</a></li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-4 text-2xl font-bold text-teal-300">Contact Us</h3>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2"><FaPhoneAlt /> (+94) 11-2501351</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> (+94) 11-3504391</li>
            <li className="flex items-center gap-2"><MdEmail /> ifrs@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-sm text-center text-gray-300">
        &copy; 2025 <span className="font-medium text-white">LFRS</span>. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
