import { useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { X } from "lucide-react";

const Ytupload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploadMessage("");
        if (!file || !title || !scheduledTime) {
            setUploadMessage("Please provide all required fields.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("scheduledTime", scheduledTime);

        try {
            const response = await fetch("http://localhost:5000/api/youtube/upload", {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                setUploadMessage("Video scheduled for upload successfully!");
            } else {
                setUploadMessage(result.error || "Failed to upload video.");
            }
        } catch (error) {
            setUploadMessage("Error uploading video.");
            console.log(error)
        }
        setLoading(false);
        setFile(null);
        setTitle("");
        setDescription("");
        setScheduledTime("");
    };

    return (
        <div className="relative mt-30 w-full min-h-screen overflow-hidden">
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

            <section className="relative z-10 p-6">
                <div className="max-w-5xl mx-auto bg-transparent bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <div className="flex flex-col items-center">
                            <FaYoutube className="w-16 h-16 text-red-500" />
                            <h2 className="text-2xl font-bold text-black mt-2">YouTube</h2>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-black text-center mb-4">
                                Upload Video
                            </h3>
                            {uploadMessage && (
                                <p className="text-center text-green-500 mb-2">{uploadMessage}</p>
                            )}
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    {!file ? (
                                        <>
                                            <label className="block text-sm font-medium text-black mb-2">Upload Video</label>
                                            <div className="p-1 rounded-md">
                                                <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-md bg-white hover:bg-gray-50 transition">
                                                    <span className="text-gray-600">Drag and drop here, or </span>
                                                    <label className="ml-2 text-blue-600 hover:underline cursor-pointer">
                                                        browse
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            className="hidden"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mt-2 flex items-center justify-between px-4 py-2 bg-white rounded shadow w-64">
                                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                            <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
                                                <X size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Scheduled Time</label>
                                    <input
                                        type="datetime-local"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                                        disabled={loading}
                                    >
                                        {loading ? "Uploading..." : "Upload Video"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Ytupload;
