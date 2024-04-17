import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { clearAuthUser } from "@/store/user.js";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(clearAuthUser);
        navigate("/login");
    }

    return (
        <header className="flex items-center h-14 px-4 border-b bg-white md:px-6 dark:bg-gray-950">
            <Link to="/" className="flex items-center gap-2 mr-4">
                <SunIcon className="w-5 h-5 fill-current" />
                <span className="font-semibold">Astro Snap</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 flex-1">
                <Link to="/astronomy-picture-of-the-day" className="font-medium">Astronomy Picture of the Day</Link>
                <Link to="/mars-rover-photo-gallery" className="font-medium">Mars Rover Photo Gallery</Link>
                <Link to="/live-space-missions-tracker" className="font-medium">Live Space Missions Tracker</Link>
                <Link to="/educational-news" className="font-medium">Educational News</Link>
            </nav>
                {
                    localStorage.getItem("token") ? (
                        <Button className="bg-red-800 text-white hover:bg-red-700" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }
        </header>
    );
}

function SunIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );
}

export { Navbar };
