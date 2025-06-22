import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "About Us",
    "Admin",
    "Academics",
    "Notices",
    "Placements",
    "Login",
  ];

  return (
    <header className="w-full flex flex-col relative bg-white shadow-md">

      <div className="h-[3vh] w-full bg-yellow-500" />
      <div className="w-full flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <img
          src="/logo.png"
          alt="DTU Left Logo"
          className="w-20 sm:w-24 md:w-28 lg:w-32"
        />


        <div className="text-center px-2">
          <h1 className="font-bold text-sm sm:text-lg md:text-xl">
            DELHI TECHNOLOGICAL UNIVERSITY
          </h1>
          <h2 className="text-xs sm:text-sm">Formerly Delhi College of Engineering</h2>
          <h2 className="text-xs sm:text-sm text-blue-700 font-semibold">
            Welcome to DTU ADMIN PANEL
          </h2>
        </div>


        <img
          src="/logo.png"
          alt="DTU Right Logo"
          className="w-20 sm:w-24 md:w-28 lg:w-32"
        />
      </div>

{/* //navigation bar */}
      <nav className="w-full bg-sky-600 text-white px-4 py-2 md:px-0 md:py-0">
{/* // Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center">
          <span className="font-medium">Menu</span>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
{/* // Navbar Items */}
        <ul
          className={`flex flex-col md:flex-row md:justify-center gap-4 md:gap-6 text-sm sm:text-base font-medium py-2 md:py-3 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {navItems.map((label) => (
            <li key={label}>
              <NavLink
                to={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `block px-3 py-1 hover:bg-sky-700 rounded ${
                    isActive ? "border-b-1 font-bold" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
