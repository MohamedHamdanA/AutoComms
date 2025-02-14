// import { motion } from "framer-motion";
// const Gformcreate = () => {
//     return (
//                 <div className="relative w-full min-h-screen overflow-hidden">

//                     {/* 🔹 Background (Gradient + Large Text) */}
//                     <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">

//                         {/* Large "AutoComms" Text in Background */}
//                         <motion.h1 
//                             className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
//                             initial={{ opacity: 0, scale: 0 }}
//                             animate={{ opacity: 0.2, scale: 1 }}
//                             transition={{ duration: 2 }}
//                         >
//                             AutoComms
//                         </motion.h1>
//                     </div>


//                 </div>
//             );
// }

// export default Gformcreate

import { useState } from "react";
import { motion } from "framer-motion";

const Gformcreate = () => {
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formLink, setFormLink] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        // Build form data to submit to your backend
        const formData = new FormData();
        formData.append("form_title", formTitle);
        formData.append("form_description", formDescription);
        formData.append("form_link", formLink);

        try {
            // Replace with your API endpoint if needed
            const response = await fetch("http://localhost:5000/api/googleforms", {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const result = await response.json();
            if (response.ok) {
                setMessage("Google Form created successfully!");
                // Optionally, you can clear the form here or redirect
            } else {
                setMessage(result.error || "Failed to create form.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage(error.message);
        } finally {
            setFormTitle("");
            setFormDescription("");
            setFormLink("");
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background */}
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

            {/* Main Content - Form */}
            <section className="relative mt-11 z-10 flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-lg p-8 bg-white backdrop-blur-lg rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center text-black">
                        Create Google Form
                    </h2>
                    {message && (
                        <p
                            className={`text-center mb-4 ${message.includes("success")
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form Title */}
                        <div>
                            <label
                                htmlFor="formTitle"
                                className="block text-sm font-medium text-black mb-1"
                            >
                                Form Title
                            </label>
                            <input
                                type="text"
                                id="formTitle"
                                name="formTitle"
                                placeholder="Enter form title"
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black placeholder-black"
                                required
                            />
                        </div>
                        {/* Form Description */}
                        <div>
                            <label
                                htmlFor="formDescription"
                                className="block text-sm font-medium text-black mb-1"
                            >
                                Form Description
                            </label>
                            <textarea
                                id="formDescription"
                                name="formDescription"
                                rows="4"
                                placeholder="Enter form description"
                                value={formDescription}
                                onChange={(e) => setFormDescription(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black placeholder-black"
                                required
                            ></textarea>
                        </div>
                        {/* Form Link */}
                        <div>
                            <label
                                htmlFor="formLink"
                                className="block text-sm font-medium text-black mb-1"
                            >
                                Form Link
                            </label>
                            <input
                                type="url"
                                id="formLink"
                                name="formLink"
                                placeholder="Enter form link"
                                value={formLink}
                                onChange={(e) => setFormLink(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black placeholder-black"
                                required
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                            >
                                Create Form
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Gformcreate;
