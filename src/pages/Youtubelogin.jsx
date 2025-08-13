import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Youtubelogin = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch YouTube accounts from the backend
    const fetchAccounts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/youtube/accounts", {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch accounts");
            const data = await res.json();
            setAccounts(data);
        } catch (err) {
            console.error("Error fetching accounts:", err);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    // ✅ Handle YouTube login
    const handleLogin = () => {
        window.location.href = "http://localhost:5000/api/youtube/login"; // Redirect to OAuth
    };

    // ✅ When an account is clicked, show loading and navigate to YouTube dashboard
    const handleAccountClick = (acc) => {
        setLoading(true);
        setTimeout(() => {
            navigate("/youtube"); // Redirect user inside
        }, 2000);
    };

    // ✅ Remove a single account
    const handleRemove = async (e, accEmail) => {
        e.stopPropagation(); // Prevent triggering account selection
        const confirmLogout = window.confirm(`Sign out ${accEmail}?`);
        if (confirmLogout) {
            try {
                const res = await fetch("http://localhost:5000/api/youtube/logout", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ youtubeEmail: accEmail }),
                });
                if (!res.ok) throw new Error("Failed to sign out");
                fetchAccounts(); // Refresh the accounts list
            } catch (err) {
                console.error("Error signing out:", err);
            }
        }
    };

    // ✅ Remove all linked accounts
    const handleSignOutAll = async () => {
        const confirmAll = window.confirm("Sign out of all accounts?");
        if (confirmAll) {
            try {
                const res = await fetch("http://localhost:5000/api/youtube/logout-all", {
                    method: "POST",
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to sign out");
                fetchAccounts();
            } catch (err) {
                console.error("Error signing out all accounts:", err);
            }
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
                <motion.h1
                    className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2 }}
                >
                    AutoComms
                </motion.h1>
            </div>

            <section className="relative z-10 flex items-center justify-center min-h-screen p-4">
    <div className="w-full max-w-sm bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg">
        {loading ? (
            <div className="flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        ) : accounts.length > 0 ? (
            <div>
                <h2 className="text-center text-xl font-bold p-4">Choose an account</h2>
                <ul className="divide-y divide-gray-200">
                    {accounts.map((acc, index) => (
                        <li
                            key={index} // Using index if youtube_email is undefined
                            className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleAccountClick(acc)}
                        >
                            <div className="h-10 w-10 bg-gray-300 text-gray-700 flex items-center justify-center rounded-full mr-3 font-bold uppercase">
                                {acc.youtube_email ? acc.youtube_email.charAt(0) : "?"}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">
                                    {acc.youtube_email || "Unknown"}
                                </p>
                            </div>
                            <button
                                aria-label="Sign out"
                                onClick={(e) => handleRemove(e, acc.youtube_email)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m-2 0h-2a2 2 0 00-2 2v10a2 2 0 002 2h2" />
                                </svg>
                            </button>
                        </li>
                    ))}
                    <li className="flex items-center p-4 cursor-pointer hover:bg-gray-50" onClick={handleLogin}>
                        <div className="h-10 w-10 flex items-center justify-center mr-3 text-blue-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm text-blue-600 font-semibold">Add another account</span>
                    </li>
                    <li className="flex items-center p-4 cursor-pointer hover:bg-gray-50" onClick={handleSignOutAll}>
                        <span className="text-sm text-gray-800 font-semibold">Sign out of all accounts</span>
                    </li>
                </ul>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center p-6">
                <p className="text-lg text-gray-600">No linked accounts</p>
                <button
                    onClick={handleLogin}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add an Account
                </button>
            </div>
        )}
    </div>
</section>

        </div>
    );
};

export default Youtubelogin;
