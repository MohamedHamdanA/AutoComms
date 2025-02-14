// import { motion } from "framer-motion";

// const ClassCreate = () => {
//     return (
//         <div className="relative w-full min-h-screen overflow-hidden">

//             {/* 🔹 Background (Gradient + Large Text) */}
//             <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">

//                 {/* Large "AutoComms" Text in Background */}
//                 <motion.h1 
//                     className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 0.2, scale: 1 }}
//                     transition={{ duration: 2 }}
//                 >
//                     AutoComms
//                 </motion.h1>
//             </div>

//             {/*  Main Content Section */}
//             <section className="relative z-10 flex items-center justify-center min-h-screen">
//                 <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg">
//                     <h2 className="text-3xl font-bold">Hello Classes create page</h2>
//                 </div>
//             </section>

//         </div>
//     );
// };

// export default ClassCreate


import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {  X } from "lucide-react";

const ClassCreate = () => {
    const [className, setClassName] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        const formData = new FormData();
        formData.append("class_name", className);
        if (file) formData.append("fileUpload", file);
        try {
            if (!file) {
                throw new Error("Please select a file");
            }
            const response = await fetch("http://localhost:5000/api/classes", {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const result = await response.json();

            if (response.ok) {
                setMessage("Class created successfully!");
                setTimeout(() => navigate("/classes"), 1000);
            } else {
                setMessage(result.error || "Failed to create class.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage(error.message);
        } finally {
            setClassName("");
            setFile(null);
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
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
            <section className="relative mt-7 z-10 flex items-center justify-center min-h-screen p-6">
                <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-black shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Create a New Class</h2>
                    {message && (
                        <p
                            className={`text-center ${message.includes("success") ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Class Name Input */}
                        <div>
                            <label
                                htmlFor="className"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Class Name
                            </label>
                            <input
                                type="text"
                                id="className"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                placeholder="Enter class name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                        {/* File Upload Section */}
                        <div>
                        {!file && (
                            <>
                            <label
                                htmlFor="fileUpload"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Upload Excel Sheet
                            </label>
                            <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed rounded-md border-gray-300 hover:border-purple-400 transition">
                                <span className="text-gray-500">
                                    Drag and drop an Excel file here, or{" "}
                                </span>
                                <label
                                    htmlFor="fileUpload"
                                    className="ml-2 text-purple-600 hover:underline cursor-pointer"
                                >
                                    browse
                                </label>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept=".xls, .xlsx"
                                    name="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            </>
                            )}
                            {/* Display Selected File */}
                            {file && (
                                <div>
                                    <div
                                    className="block text-sm font-medium text-gray-700 mb-2">
                                    Uploaded Excel Sheet
                                    </div>
                                    <div className="mt-4  flex items-center justify-between  w-64 bg-gray-400 p-2 rounded shadow">
                                    <span className="text-sm text-white">{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="text-red-500  hover:text-red-900"
                                    >
                                        <X size={20} />
                                    </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                            >
                                Create Class
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ClassCreate;

