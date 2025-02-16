
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google"; // Redirect to Google Auth
        setIsLoggedIn(true);
        setShowLoginPopup(false);
    };

    const handleLogout = async () => {
        try {
            // Call your signout endpoint; adjust method/headers as needed
            const response = await fetch("http://localhost:5000/api/auth/signout", {
                method: "POST",
                credentials: "include", // Ensure cookies are sent with the request
            });
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            // After logout, you can either reload the page or navigate to the home/login page.
            window.location.href = "/";
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef]);

    // Disable scrolling when login popup is open
    useEffect(() => {
        if (showLoginPopup) {
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup when unmounted
        };
    }, [showLoginPopup]);

    return (
        <motion.nav

            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between w-[90%] md:w-[60%] z-50 backdrop-blur-lg bg-opacity-80 transition-all duration-300 ${scrolling ? 'top-2 shadow-xl bg-opacity-90' : ''}`}
        >
            <div className="text-xl font-bold text-gray-800">
                <NavLink to="/" className="transition">AutoComms</NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 font-semibold hover:text-blue-600 transition">Home</Link>
                <Link to="/classes" className="text-gray-700 font-semibold hover:text-blue-600 transition">Classes</Link>
                <Link to="/instagram" className="text-gray-700 font-semibold hover:text-blue-600 transition">Instagram</Link>
                <Link to="/Youtubelogin" className="text-gray-700 font-semibold hover:text-blue-600 transition">YouTube</Link>
                <Link to="/facebook" className="text-gray-700 font-semibold hover:text-blue-600 transition">Facebook</Link>
            </div>

            {/* Mobile Menu & User Profile */}
            <div className="flex items-center space-x-4 relative">
                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* User Profile Menu */}
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    <User className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
                </button>

                <AnimatePresence>
                    {userMenuOpen && (
                        <motion.div
                            ref={userMenuRef}
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-10 right-0 bg-white shadow-lg rounded-xl py-3 px-4 flex flex-col items-start space-y-2 w-40 backdrop-blur-lg bg-opacity-90"
                        >
                            {isLoggedIn ? (
                                <>
                                    <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition">Sign Out</button>
                                </>
                            ) : (
                                <button onClick={() => { setShowLoginPopup(true); setUserMenuOpen(!userMenuOpen); }} className="text-gray-700 hover:text-blue-600 transition">Login</button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl py-4 px-6 flex flex-col items-center space-y-4 w-[80%] backdrop-blur-lg bg-opacity-90"
                    >
                        <Link to="/" className="text-gray-700 font-semibold hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/classes" className="text-gray-700 font-semibold hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Classes</Link>
                        <Link to="/instagram" className="text-gray-700 font-semibold hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Instagram</Link>
                        <Link to="/Youtubelogin" className="text-gray-700 font-semibold hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>YouTube</Link>
                        <Link to="/facebook" className="text-gray-700 font-semibold hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Facebook</Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Popup */}
            <AnimatePresence>
                {showLoginPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center mt-72 bg-opacity-50 backdrop-blur-sm z-50"
                    >
                        <div className="relative bg-white px-14 py-20 rounded-lg shadow-xl flex flex-col items-center space-y-4 w-80">
                            {/* Close Button (X) */}
                            <button
                                onClick={() => setShowLoginPopup(false)}
                                className="absolute top-3 right-3 text-red-600 hover:text-red-900 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-xl font-semibold">Login</h2>

                            <button
                                onClick={handleLogin}
                                className="flex items-center space-x-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <FcGoogle className="w-6 h-6" />
                                <span>Login with Google</span>
                            </button>

                            <button
                                onClick={() => setShowLoginPopup(false)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
