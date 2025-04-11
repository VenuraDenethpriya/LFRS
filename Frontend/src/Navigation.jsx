import { useState } from 'react';
import { Button } from "./components/ui/button";
import { Link, Navigate } from 'react-router';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisited, setIsVisited] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleAboutScroll = () => {
        const aboutSection = document.getElementById('aboutUs');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleContactScroll = () => {
        const contactSection = document.getElementById('footer');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <nav className="flex bg-blue-950 text-white px-12 py-8 justify-between">
            {/* Large Nav */}
            <ul className="hidden sm:flex gap-8">
                <li className="text-2xl hover:text-slate-400 " onClick={()=> setIsVisited(true)}><Link to="/">Home</Link></li>
                <li className="pt-1 hover:text-slate-400"><Link to="/reports">Reports</Link></li>
                <li className="pt-1 hover:text-slate-400"><a href="#aboutUs" onClick={handleAboutScroll}>About</a></li>
                <li className="pt-1 hover:text-slate-400"><a href="#" onClick={handleContactScroll}>Contact</a></li>
            </ul>

            {/* Mobile Hamburger Menu */}
            <div className="sm:hidden flex items-center" onClick={toggleMenu}>
                {
                    isOpen ? <button className="text-white">X</button> : <button className="text-white">☰</button>
                }
                
            </div>

            {/* Dropdown Menu for Mobile  */}
            <div
                className={`sm:hidden ${isOpen ? 'block' : 'hidden'} absolute top-8 left-20 w-fit px-12 bg-blue-950 bg-opacity-70 backdrop-blur-md text-white z-50 rounded-md shadow-md`
                }>
                <ul className="flex flex-col items-center py-4">
                    <li className="text-md hover:text-slate-300 py-2"><Link to="/">Home</Link></li>
                    <li className="pt-1 text-sm hover:text-slate-300 py-2"><Link to="/reports">Reports</Link></li>
                    <li className="pt-1 text-sm hover:text-slate-300 py-2"><a href="#" onClick={handleAboutScroll}>About</a></li>
                    <li className="pt-1 text-sm hover:text-slate-300 py-2"><a href="#" onClick={handleContactScroll}>Contact</a></li>
                </ul>
            </div>

            <SignedIn>
                <UserButton/>
            </SignedIn>

            <SignedOut>
                <div className="flex gap-4">
                <div>
                    <Link to="/signin">
                    <Button variant="link">Signin</Button>
                    </Link>
                    
                </div>
                <div>
                    <Link to="/signup">
                    <Button variant="outline">Signup</Button>
                    </Link>
                    
                </div>
            </div>
            </SignedOut>
            
        </nav>
    );
}

export default Navigation;
