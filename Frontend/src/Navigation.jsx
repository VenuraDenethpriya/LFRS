import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "./components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleScrollTo = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // close mobile menu after click
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-blue-950/80 backdrop-blur-md px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Logo or Title */}
                <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-slate-300 transition">LFRS</Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 items-center text-white font-medium">
                    <li><Link to="/" className="hover:text-slate-300 transition">Home</Link></li>
                    <li><Link to="/reports" className="hover:text-slate-300 transition">Reports</Link></li>
                    <li><button onClick={() => handleScrollTo('aboutUs')} className="hover:text-slate-300 transition">About</button></li>
                    <li><button onClick={() => handleScrollTo('footer')} className="hover:text-slate-300 transition">Contact</button></li>
                </ul>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <Link to="/signin"><Button variant="link" className="text-white">Signin</Button></Link>
                        <Link to="/signup"><Button variant="outline" className="w-full text-white">Signup</Button></Link>
                    </SignedOut>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white" onClick={toggleMenu}>
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden mt-3 rounded-xl bg-blue-900/90 shadow-lg px-6 py-4 space-y-4 text-white font-medium backdrop-blur-sm">
                    <ul className="space-y-3">
                        <li><Link to="/" onClick={toggleMenu} className="block hover:text-slate-300 transition">Home</Link></li>
                        <li><Link to="/reports" onClick={toggleMenu} className="block hover:text-slate-300 transition">Reports</Link></li>
                        <li><button onClick={() => handleScrollTo('aboutUs')} className="block w-full text-left hover:text-slate-300 transition">About</button></li>
                        <li><button onClick={() => handleScrollTo('footer')} className="block w-full text-left hover:text-slate-300 transition">Contact</button></li>
                    </ul>

                    <div className="border-t border-slate-600 pt-4 flex flex-col gap-2">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/signin"><Button variant="link" className="text-white w-full">Signin</Button></Link>
                            <Link to="/signup"><Button variant="outline" className="w-ful">Signup</Button></Link>
                        </SignedOut>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
