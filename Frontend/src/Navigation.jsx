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
        <nav className="sticky top-0 z-50 px-6 py-4 shadow-md bg-blue-950/80 backdrop-blur-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl">
                
                {/* Logo or Title */}
                <Link to="/" className="text-2xl font-bold tracking-wide text-white transition hover:text-slate-300">LFRS</Link>

                {/* Desktop Menu */}
                <ul className="items-center hidden space-x-8 font-medium text-white md:flex">
                    <li><Link to="/" className="transition hover:text-slate-300">Home</Link></li>
                    <li><Link to="/reports" className="transition hover:text-slate-300">Reports</Link></li>
                    <li><button onClick={() => handleScrollTo('aboutUs')} className="transition hover:text-slate-300">About</button></li>
                    <li><button onClick={() => handleScrollTo('footer')} className="transition hover:text-slate-300">Contact</button></li>
                </ul>

                {/* Auth Buttons */}
                <div className="items-center hidden gap-4 md:flex">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <Link to="/signin"><Button variant="link" className="text-white">Signin</Button></Link>
                        <Link to="/signup"><Button variant="outline" className="w-full text-white">Signup</Button></Link>
                    </SignedOut>
                </div>

                {/* Mobile Menu Icon */}
                <div className="text-white md:hidden" onClick={toggleMenu}>
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="px-6 py-4 mt-3 space-y-4 font-medium text-white shadow-lg md:hidden rounded-xl bg-blue-900/90 backdrop-blur-sm">
                    <ul className="space-y-3">
                        <li><Link to="/" onClick={toggleMenu} className="block transition hover:text-slate-300">Home</Link></li>
                        <li><Link to="/reports" onClick={toggleMenu} className="block transition hover:text-slate-300">Reports</Link></li>
                        <li><button onClick={() => handleScrollTo('aboutUs')} className="block w-full text-left transition hover:text-slate-300">About</button></li>
                        <li><button onClick={() => handleScrollTo('footer')} className="block w-full text-left transition hover:text-slate-300">Contact</button></li>
                    </ul>

                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-600">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/signin"><Button variant="link" className="w-full text-white">Signin</Button></Link>
                            <Link to="/signup"><Button variant="outline" className="w-ful">Signup</Button></Link>
                        </SignedOut>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
