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

//             {/* 🔹 Main Content Section */}
//             <section className="relative z-10 flex items-center justify-center min-h-screen">
//                 <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg">
//                     <h2 className="text-3xl font-bold">Hello Classes create page</h2>
//                 </div>
//             </section>

//         </div>
//     );
// };

// export default ClassCreate
import { motion } from "framer-motion";

const ClassCreate = () => {
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

            {/* Main Content Section */}
            <section className="relative mt-7 z-10 flex items-center justify-center min-h-screen p-6">
                <div className="p-6 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-xl text-black shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Create a New Class</h2>
                    <form className="space-y-6">
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
                                name="className"
                                placeholder="Enter class name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Enter class description"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                        <div>
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
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                    className="hidden"
                                />
                            </div>
                        </div>
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
