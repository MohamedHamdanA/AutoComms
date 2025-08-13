// src/Youtubelogin.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InstaLogin = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fetch the local JSON file from the public folder
  const fetchAccounts = async () => {
    try {
      const res = await fetch("/google-accounts.json");
      const data = await res.json();
      console.log("Fetched data:", data);
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // When an account is clicked, show loading then redirect
  const handleAccountClick = (acc) => {
    setLoading(true);
    // Optionally, store the selected account (e.g., in localStorage or context)
    setTimeout(() => {
      navigate("/instagram");
    }, 3000); // 3-second delay
  };

  // Ask for confirmation before removing a single account
  const handleRemove = (e, acc) => {
    e.stopPropagation(); // Prevent row click from triggering
    const confirmLogout = window.confirm(
      `Are you sure you want to sign out ${acc.email}?`
    );
    if (confirmLogout) {
      setAccounts((prevAccounts) =>
        prevAccounts.filter((item) => item.email !== acc.email)
      );
      alert(`Account ${acc.email} removed`);
    }
  };

  // Ask for confirmation before signing out all accounts
  const handleSignOutAll = () => {
    const confirmAll = window.confirm(
      "Are you sure you want to sign out all accounts?"
    );
    if (confirmAll) {
      setAccounts([]);
      alert("All accounts signed out");
    }
  };

  // Open modal for adding a new account
  const handleAddAccount = () => {
    setShowAddModal(true);
  };

  // Handle form submission for new account
  const handleAddAccountSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const newAccount = {
      name: `${firstName} ${lastName}`,
      email,
      password, // For demo purposes only; don't store plaintext passwords in production!
      signedIn: false,
    };
    setAccounts((prev) => [...prev, newAccount]);
    // Clear form fields and close modal
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setShowAddModal(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background remains unchanged */}
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

      {/* Main Content Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg">
          {loading ? (
            // Loading spinner and message
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                Loading...
              </p>
            </div>
          ) : (
            // Account list UI with header "Choose an account"
            <div>
              <h2 className="text-center text-xl font-bold p-4">
                Choose an account
              </h2>
              <ul className="divide-y divide-gray-200">
                {accounts.map((acc) => (
                  <li
                    key={acc.email}
                    className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleAccountClick(acc)}
                  >
                    {/* Avatar */}
                    <div className="h-10 w-10 bg-gray-300 text-gray-700 flex items-center justify-center rounded-full mr-3 font-bold uppercase">
                      {acc.name ? acc.name.charAt(0) : acc.email.charAt(0)}
                    </div>
                    {/* Name & Email */}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {acc.name}
                      </p>
                      <p className="text-xs text-gray-600">{acc.email}</p>
                    </div>
                    {/* Logout Icon */}
                    <button
                      aria-label="Sign out"
                      onClick={(e) => handleRemove(e, acc)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m-2 0h-2a2 2 0 00-2 2v10a2 2 0 002 2h2"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
                {/* "Add another account" row */}
                <li
                  className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
                  onClick={handleAddAccount}
                >
                  <div className="h-10 w-10 flex items-center justify-center mr-3 text-blue-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-blue-600 font-semibold">
                    Add another account
                  </span>
                </li>
                {/* "Sign out of all accounts" row */}
                <li
                  className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
                  onClick={handleSignOutAll}
                >
                  <span className="text-sm text-gray-800 font-semibold">
                    Sign out of all accounts
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              Add New Account
            </h3>
            <form onSubmit={handleAddAccountSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstaLogin;
