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
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-blue-900 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white transition hover:text-green-300">
          LFRS
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-10 font-semibold text-white md:flex">
          <li><Link to="/" className="transition hover:text-green-300">Home</Link></li>
          <li><Link to="/reports" className="transition hover:text-green-300">Reports</Link></li>
          <li><button onClick={() => handleScrollTo('aboutUs')} className="transition hover:text-green-300">About</button></li>
          <li><button onClick={() => handleScrollTo('footer')} className="transition hover:text-green-300">Contact</button></li>
        </ul>

        {/* Auth Buttons - Desktop */}
        <div className="items-center hidden gap-4 md:flex">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link to="/signin">
              <Button variant="link" className="px-3 text-white hover:text-green-300">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="text-white border-white hover:bg-green-500 hover:text-white hover:border-green-300">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="text-white transition-transform md:hidden focus:outline-none">
          {isOpen ? <X size={28} className="transition rotate-90" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`overflow-hidden md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
        }`}
      >
        <div className="p-6 space-y-6 text-white bg-blue-900 shadow-lg backdrop-blur-md rounded-xl">
          <ul className="space-y-4 text-lg font-medium">
            <li><Link to="/" onClick={toggleMenu} className="block hover:text-green-300">Home</Link></li>
            <li><Link to="/reports" onClick={toggleMenu} className="block hover:text-green-300">Reports</Link></li>
            <li><button onClick={() => handleScrollTo('aboutUs')} className="block w-full text-left hover:text-green-300">About</button></li>
            <li><button onClick={() => handleScrollTo('footer')} className="block w-full text-left hover:text-green-300">Contact</button></li>
          </ul>

          <div className="flex flex-col gap-3 pt-4 border-t border-slate-600">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to="/signin">
                <Button variant="link" className="w-full text-white hover:text-green-300">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="w-full text-white border-white hover:bg-green-500 hover:text-white hover:border-green-300">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
